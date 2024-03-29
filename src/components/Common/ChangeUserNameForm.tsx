import { useUpdateUserNameMutation } from "@/generates/graphql";
import { useLoading, useLogModal, useUserStatus } from "@/hooks/client";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import { Button, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
export function ChangeUserNameForm() {
    const { userId, userName, refetch } = useUserStatus({ redirect: true });
    const [changedName, setChangeName] = useState(userName);
    const { errorHandle, successHandle } = useLogModal();
    const [changeName, { loading }] = useUpdateUserNameMutation({
        variables: { userId: userId, userName: changedName ?? "" },
        onError: (e) =>
            errorHandle({ message: `ユーザー名を変更できませんでした${e}` }),
        onCompleted: (result) => {
            successHandle({
                message: `ユーザー名を${result.updateUsersByPk?.userName}に変更しました`,
            });
            refetch();
        },
    });
    const handleChangeName = () => {
        if (userName === changedName) {
            return;
        }
        changeName();
    };
    useLoading({ isLoading: loading, message: "ユーザー名を変更しています" });
    useEffect(() => {
        setChangeName(userName);
    }, [userName]);
    return (
        <Stack direction="row" spacing={2}>
            <TextField
                value={changedName}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setChangeName(event.target.value)
                }
            />
            <Button
                disabled={userName == changedName}
                startIcon={<PublishedWithChangesIcon />}
                onClick={handleChangeName}
            >
                変更
            </Button>
        </Stack>
    );
}
