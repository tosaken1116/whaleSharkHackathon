import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  uuid: string;
};

/** ordering argument of a cursor */
export enum CursorOrdering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

/** columns and relationships of "MeetingLog" */
export type MeetingLog = {
  __typename?: 'MeetingLog';
  id: Scalars['uuid'];
  log: Scalars['String'];
  ownerId?: Maybe<Scalars['String']>;
  /** An object relationship */
  ownerName?: Maybe<Users>;
};

/** aggregated selection of "MeetingLog" */
export type MeetingLogAggregate = {
  __typename?: 'MeetingLogAggregate';
  aggregate?: Maybe<MeetingLogAggregateFields>;
  nodes: Array<MeetingLog>;
};

/** aggregate fields of "MeetingLog" */
export type MeetingLogAggregateFields = {
  __typename?: 'MeetingLogAggregateFields';
  count: Scalars['Int'];
  max?: Maybe<MeetingLogMaxFields>;
  min?: Maybe<MeetingLogMinFields>;
};


/** aggregate fields of "MeetingLog" */
export type MeetingLogAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<MeetingLogSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "MeetingLog". All fields are combined with a logical 'AND'. */
export type MeetingLogBoolExp = {
  _and?: InputMaybe<Array<MeetingLogBoolExp>>;
  _not?: InputMaybe<MeetingLogBoolExp>;
  _or?: InputMaybe<Array<MeetingLogBoolExp>>;
  id?: InputMaybe<UuidComparisonExp>;
  log?: InputMaybe<StringComparisonExp>;
  ownerId?: InputMaybe<StringComparisonExp>;
  ownerName?: InputMaybe<UsersBoolExp>;
};

/** unique or primary key constraints on table "MeetingLog" */
export enum MeetingLogConstraint {
  /** unique or primary key constraint on columns "id" */
  MeetingLogPkey = 'MeetingLog_pkey'
}

/** input type for inserting data into table "MeetingLog" */
export type MeetingLogInsertInput = {
  id?: InputMaybe<Scalars['uuid']>;
  log?: InputMaybe<Scalars['String']>;
  ownerId?: InputMaybe<Scalars['String']>;
  ownerName?: InputMaybe<UsersObjRelInsertInput>;
};

/** aggregate max on columns */
export type MeetingLogMaxFields = {
  __typename?: 'MeetingLogMaxFields';
  id?: Maybe<Scalars['uuid']>;
  log?: Maybe<Scalars['String']>;
  ownerId?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type MeetingLogMinFields = {
  __typename?: 'MeetingLogMinFields';
  id?: Maybe<Scalars['uuid']>;
  log?: Maybe<Scalars['String']>;
  ownerId?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "MeetingLog" */
export type MeetingLogMutationResponse = {
  __typename?: 'MeetingLogMutationResponse';
  /** number of rows affected by the mutation */
  affectedRows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<MeetingLog>;
};

/** on_conflict condition type for table "MeetingLog" */
export type MeetingLogOnConflict = {
  constraint: MeetingLogConstraint;
  updateColumns?: Array<MeetingLogUpdateColumn>;
  where?: InputMaybe<MeetingLogBoolExp>;
};

/** Ordering options when selecting data from "MeetingLog". */
export type MeetingLogOrderBy = {
  id?: InputMaybe<OrderBy>;
  log?: InputMaybe<OrderBy>;
  ownerId?: InputMaybe<OrderBy>;
  ownerName?: InputMaybe<UsersOrderBy>;
};

/** primary key columns input for table: MeetingLog */
export type MeetingLogPkColumnsInput = {
  id: Scalars['uuid'];
};

/** select columns of table "MeetingLog" */
export enum MeetingLogSelectColumn {
  /** column name */
  Id = 'id',
  /** column name */
  Log = 'log',
  /** column name */
  OwnerId = 'ownerId'
}

/** input type for updating data in table "MeetingLog" */
export type MeetingLogSetInput = {
  id?: InputMaybe<Scalars['uuid']>;
  log?: InputMaybe<Scalars['String']>;
  ownerId?: InputMaybe<Scalars['String']>;
};

/** Streaming cursor of the table "MeetingLog" */
export type MeetingLogStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: MeetingLogStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type MeetingLogStreamCursorValueInput = {
  id?: InputMaybe<Scalars['uuid']>;
  log?: InputMaybe<Scalars['String']>;
  ownerId?: InputMaybe<Scalars['String']>;
};

/** update columns of table "MeetingLog" */
export enum MeetingLogUpdateColumn {
  /** column name */
  Id = 'id',
  /** column name */
  Log = 'log',
  /** column name */
  OwnerId = 'ownerId'
}

export type MeetingLogUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<MeetingLogSetInput>;
  /** filter the rows which have to be updated */
  where: MeetingLogBoolExp;
};

/** column ordering options */
export enum OrderBy {
  /** in ascending order, nulls last */
  Asc = 'ASC',
  /** in ascending order, nulls first */
  AscNullsFirst = 'ASC_NULLS_FIRST',
  /** in ascending order, nulls last */
  AscNullsLast = 'ASC_NULLS_LAST',
  /** in descending order, nulls first */
  Desc = 'DESC',
  /** in descending order, nulls first */
  DescNullsFirst = 'DESC_NULLS_FIRST',
  /** in descending order, nulls last */
  DescNullsLast = 'DESC_NULLS_LAST'
}

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type StringComparisonExp = {
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']>;
  _isNull?: InputMaybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "Users" */
export type Users = {
  __typename?: 'Users';
  email: Scalars['String'];
  id: Scalars['String'];
};

/** aggregated selection of "Users" */
export type UsersAggregate = {
  __typename?: 'UsersAggregate';
  aggregate?: Maybe<UsersAggregateFields>;
  nodes: Array<Users>;
};

/** aggregate fields of "Users" */
export type UsersAggregateFields = {
  __typename?: 'UsersAggregateFields';
  count: Scalars['Int'];
  max?: Maybe<UsersMaxFields>;
  min?: Maybe<UsersMinFields>;
};


/** aggregate fields of "Users" */
export type UsersAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<UsersSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "Users". All fields are combined with a logical 'AND'. */
export type UsersBoolExp = {
  _and?: InputMaybe<Array<UsersBoolExp>>;
  _not?: InputMaybe<UsersBoolExp>;
  _or?: InputMaybe<Array<UsersBoolExp>>;
  email?: InputMaybe<StringComparisonExp>;
  id?: InputMaybe<StringComparisonExp>;
};

/** unique or primary key constraints on table "Users" */
export enum UsersConstraint {
  /** unique or primary key constraint on columns "email" */
  UsersPkey = 'Users_pkey'
}

/** input type for inserting data into table "Users" */
export type UsersInsertInput = {
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type UsersMaxFields = {
  __typename?: 'UsersMaxFields';
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type UsersMinFields = {
  __typename?: 'UsersMinFields';
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "Users" */
export type UsersMutationResponse = {
  __typename?: 'UsersMutationResponse';
  /** number of rows affected by the mutation */
  affectedRows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Users>;
};

/** input type for inserting object relation for remote table "Users" */
export type UsersObjRelInsertInput = {
  data: UsersInsertInput;
  /** upsert condition */
  onConflict?: InputMaybe<UsersOnConflict>;
};

/** on_conflict condition type for table "Users" */
export type UsersOnConflict = {
  constraint: UsersConstraint;
  updateColumns?: Array<UsersUpdateColumn>;
  where?: InputMaybe<UsersBoolExp>;
};

/** Ordering options when selecting data from "Users". */
export type UsersOrderBy = {
  email?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: Users */
export type UsersPkColumnsInput = {
  email: Scalars['String'];
};

/** select columns of table "Users" */
export enum UsersSelectColumn {
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id'
}

/** input type for updating data in table "Users" */
export type UsersSetInput = {
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
};

/** Streaming cursor of the table "Users" */
export type UsersStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: UsersStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type UsersStreamCursorValueInput = {
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
};

/** update columns of table "Users" */
export enum UsersUpdateColumn {
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id'
}

export type UsersUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<UsersSetInput>;
  /** filter the rows which have to be updated */
  where: UsersBoolExp;
};

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type UuidComparisonExp = {
  _eq?: InputMaybe<Scalars['uuid']>;
  _gt?: InputMaybe<Scalars['uuid']>;
  _gte?: InputMaybe<Scalars['uuid']>;
  _in?: InputMaybe<Array<Scalars['uuid']>>;
  _isNull?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['uuid']>;
  _lte?: InputMaybe<Scalars['uuid']>;
  _neq?: InputMaybe<Scalars['uuid']>;
  _nin?: InputMaybe<Array<Scalars['uuid']>>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "MeetingLog" */
  deleteMeetingLog?: Maybe<MeetingLogMutationResponse>;
  /** delete single row from the table: "MeetingLog" */
  deleteMeetingLogByPk?: Maybe<MeetingLog>;
  /** delete data from the table: "Users" */
  deleteUsers?: Maybe<UsersMutationResponse>;
  /** delete single row from the table: "Users" */
  deleteUsersByPk?: Maybe<Users>;
  /** insert data into the table: "MeetingLog" */
  insertMeetingLog?: Maybe<MeetingLogMutationResponse>;
  /** insert a single row into the table: "MeetingLog" */
  insertMeetingLogOne?: Maybe<MeetingLog>;
  /** insert data into the table: "Users" */
  insertUsers?: Maybe<UsersMutationResponse>;
  /** insert a single row into the table: "Users" */
  insertUsersOne?: Maybe<Users>;
  /** update data of the table: "MeetingLog" */
  updateMeetingLog?: Maybe<MeetingLogMutationResponse>;
  /** update single row of the table: "MeetingLog" */
  updateMeetingLogByPk?: Maybe<MeetingLog>;
  /** update multiples rows of table: "MeetingLog" */
  updateMeetingLogMany?: Maybe<Array<Maybe<MeetingLogMutationResponse>>>;
  /** update data of the table: "Users" */
  updateUsers?: Maybe<UsersMutationResponse>;
  /** update single row of the table: "Users" */
  updateUsersByPk?: Maybe<Users>;
  /** update multiples rows of table: "Users" */
  updateUsersMany?: Maybe<Array<Maybe<UsersMutationResponse>>>;
};


/** mutation root */
export type Mutation_RootDeleteMeetingLogArgs = {
  where: MeetingLogBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteMeetingLogByPkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDeleteUsersArgs = {
  where: UsersBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteUsersByPkArgs = {
  email: Scalars['String'];
};


/** mutation root */
export type Mutation_RootInsertMeetingLogArgs = {
  objects: Array<MeetingLogInsertInput>;
  onConflict?: InputMaybe<MeetingLogOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertMeetingLogOneArgs = {
  object: MeetingLogInsertInput;
  onConflict?: InputMaybe<MeetingLogOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertUsersArgs = {
  objects: Array<UsersInsertInput>;
  onConflict?: InputMaybe<UsersOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertUsersOneArgs = {
  object: UsersInsertInput;
  onConflict?: InputMaybe<UsersOnConflict>;
};


/** mutation root */
export type Mutation_RootUpdateMeetingLogArgs = {
  _set?: InputMaybe<MeetingLogSetInput>;
  where: MeetingLogBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateMeetingLogByPkArgs = {
  _set?: InputMaybe<MeetingLogSetInput>;
  pkColumns: MeetingLogPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateMeetingLogManyArgs = {
  updates: Array<MeetingLogUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateUsersArgs = {
  _set?: InputMaybe<UsersSetInput>;
  where: UsersBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateUsersByPkArgs = {
  _set?: InputMaybe<UsersSetInput>;
  pkColumns: UsersPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateUsersManyArgs = {
  updates: Array<UsersUpdates>;
};

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "MeetingLog" */
  meetingLog: Array<MeetingLog>;
  /** fetch aggregated fields from the table: "MeetingLog" */
  meetingLogAggregate: MeetingLogAggregate;
  /** fetch data from the table: "MeetingLog" using primary key columns */
  meetingLogByPk?: Maybe<MeetingLog>;
  /** fetch data from the table: "Users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "Users" */
  usersAggregate: UsersAggregate;
  /** fetch data from the table: "Users" using primary key columns */
  usersByPk?: Maybe<Users>;
};


export type Query_RootMeetingLogArgs = {
  distinctOn?: InputMaybe<Array<MeetingLogSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<MeetingLogOrderBy>>;
  where?: InputMaybe<MeetingLogBoolExp>;
};


export type Query_RootMeetingLogAggregateArgs = {
  distinctOn?: InputMaybe<Array<MeetingLogSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<MeetingLogOrderBy>>;
  where?: InputMaybe<MeetingLogBoolExp>;
};


export type Query_RootMeetingLogByPkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootUsersArgs = {
  distinctOn?: InputMaybe<Array<UsersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UsersOrderBy>>;
  where?: InputMaybe<UsersBoolExp>;
};


export type Query_RootUsersAggregateArgs = {
  distinctOn?: InputMaybe<Array<UsersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UsersOrderBy>>;
  where?: InputMaybe<UsersBoolExp>;
};


export type Query_RootUsersByPkArgs = {
  email: Scalars['String'];
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "MeetingLog" */
  meetingLog: Array<MeetingLog>;
  /** fetch aggregated fields from the table: "MeetingLog" */
  meetingLogAggregate: MeetingLogAggregate;
  /** fetch data from the table: "MeetingLog" using primary key columns */
  meetingLogByPk?: Maybe<MeetingLog>;
  /** fetch data from the table in a streaming manner: "MeetingLog" */
  meetingLogStream: Array<MeetingLog>;
  /** fetch data from the table: "Users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "Users" */
  usersAggregate: UsersAggregate;
  /** fetch data from the table: "Users" using primary key columns */
  usersByPk?: Maybe<Users>;
  /** fetch data from the table in a streaming manner: "Users" */
  usersStream: Array<Users>;
};


export type Subscription_RootMeetingLogArgs = {
  distinctOn?: InputMaybe<Array<MeetingLogSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<MeetingLogOrderBy>>;
  where?: InputMaybe<MeetingLogBoolExp>;
};


export type Subscription_RootMeetingLogAggregateArgs = {
  distinctOn?: InputMaybe<Array<MeetingLogSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<MeetingLogOrderBy>>;
  where?: InputMaybe<MeetingLogBoolExp>;
};


export type Subscription_RootMeetingLogByPkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootMeetingLogStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<MeetingLogStreamCursorInput>>;
  where?: InputMaybe<MeetingLogBoolExp>;
};


export type Subscription_RootUsersArgs = {
  distinctOn?: InputMaybe<Array<UsersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UsersOrderBy>>;
  where?: InputMaybe<UsersBoolExp>;
};


export type Subscription_RootUsersAggregateArgs = {
  distinctOn?: InputMaybe<Array<UsersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UsersOrderBy>>;
  where?: InputMaybe<UsersBoolExp>;
};


export type Subscription_RootUsersByPkArgs = {
  email: Scalars['String'];
};


export type Subscription_RootUsersStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<UsersStreamCursorInput>>;
  where?: InputMaybe<UsersBoolExp>;
};

export type CreateRoomMutationVariables = Exact<{
  ownerId: Scalars['String'];
}>;


export type CreateRoomMutation = { __typename?: 'mutation_root', insertMeetingLogOne?: { __typename?: 'MeetingLog', id: string } | null };

export type DeleteRoomMutationVariables = Exact<{
  meetingId: Scalars['uuid'];
}>;


export type DeleteRoomMutation = { __typename?: 'mutation_root', deleteMeetingLogByPk?: { __typename?: 'MeetingLog', ownerId?: string | null } | null };

export type UpdateMeetingMutationVariables = Exact<{
  meetingId: Scalars['uuid'];
  updateLog: Scalars['String'];
}>;


export type UpdateMeetingMutation = { __typename?: 'mutation_root', updateMeetingLogByPk?: { __typename?: 'MeetingLog', log: string } | null };

export type RefreshMeetingLogSubscriptionVariables = Exact<{
  meetingId: Scalars['uuid'];
}>;


export type RefreshMeetingLogSubscription = { __typename?: 'subscription_root', meetingLogByPk?: { __typename?: 'MeetingLog', log: string } | null };


export const CreateRoomDocument = gql`
    mutation createRoom($ownerId: String!) {
  insertMeetingLogOne(object: {log: "", ownerId: $ownerId}) {
    id
  }
}
    `;
export type CreateRoomMutationFn = Apollo.MutationFunction<CreateRoomMutation, CreateRoomMutationVariables>;

/**
 * __useCreateRoomMutation__
 *
 * To run a mutation, you first call `useCreateRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRoomMutation, { data, loading, error }] = useCreateRoomMutation({
 *   variables: {
 *      ownerId: // value for 'ownerId'
 *   },
 * });
 */
export function useCreateRoomMutation(baseOptions?: Apollo.MutationHookOptions<CreateRoomMutation, CreateRoomMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRoomMutation, CreateRoomMutationVariables>(CreateRoomDocument, options);
      }
export type CreateRoomMutationHookResult = ReturnType<typeof useCreateRoomMutation>;
export type CreateRoomMutationResult = Apollo.MutationResult<CreateRoomMutation>;
export type CreateRoomMutationOptions = Apollo.BaseMutationOptions<CreateRoomMutation, CreateRoomMutationVariables>;
export const DeleteRoomDocument = gql`
    mutation DeleteRoom($meetingId: uuid!) {
  deleteMeetingLogByPk(id: $meetingId) {
    ownerId
  }
}
    `;
export type DeleteRoomMutationFn = Apollo.MutationFunction<DeleteRoomMutation, DeleteRoomMutationVariables>;

/**
 * __useDeleteRoomMutation__
 *
 * To run a mutation, you first call `useDeleteRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRoomMutation, { data, loading, error }] = useDeleteRoomMutation({
 *   variables: {
 *      meetingId: // value for 'meetingId'
 *   },
 * });
 */
export function useDeleteRoomMutation(baseOptions?: Apollo.MutationHookOptions<DeleteRoomMutation, DeleteRoomMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteRoomMutation, DeleteRoomMutationVariables>(DeleteRoomDocument, options);
      }
export type DeleteRoomMutationHookResult = ReturnType<typeof useDeleteRoomMutation>;
export type DeleteRoomMutationResult = Apollo.MutationResult<DeleteRoomMutation>;
export type DeleteRoomMutationOptions = Apollo.BaseMutationOptions<DeleteRoomMutation, DeleteRoomMutationVariables>;
export const UpdateMeetingDocument = gql`
    mutation updateMeeting($meetingId: uuid!, $updateLog: String!) {
  updateMeetingLogByPk(pkColumns: {id: $meetingId}, _set: {log: $updateLog}) {
    log
  }
}
    `;
export type UpdateMeetingMutationFn = Apollo.MutationFunction<UpdateMeetingMutation, UpdateMeetingMutationVariables>;

/**
 * __useUpdateMeetingMutation__
 *
 * To run a mutation, you first call `useUpdateMeetingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMeetingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMeetingMutation, { data, loading, error }] = useUpdateMeetingMutation({
 *   variables: {
 *      meetingId: // value for 'meetingId'
 *      updateLog: // value for 'updateLog'
 *   },
 * });
 */
export function useUpdateMeetingMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMeetingMutation, UpdateMeetingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMeetingMutation, UpdateMeetingMutationVariables>(UpdateMeetingDocument, options);
      }
export type UpdateMeetingMutationHookResult = ReturnType<typeof useUpdateMeetingMutation>;
export type UpdateMeetingMutationResult = Apollo.MutationResult<UpdateMeetingMutation>;
export type UpdateMeetingMutationOptions = Apollo.BaseMutationOptions<UpdateMeetingMutation, UpdateMeetingMutationVariables>;
export const RefreshMeetingLogDocument = gql`
    subscription RefreshMeetingLog($meetingId: uuid!) {
  meetingLogByPk(id: $meetingId) {
    log
  }
}
    `;

/**
 * __useRefreshMeetingLogSubscription__
 *
 * To run a query within a React component, call `useRefreshMeetingLogSubscription` and pass it any options that fit your needs.
 * When your component renders, `useRefreshMeetingLogSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRefreshMeetingLogSubscription({
 *   variables: {
 *      meetingId: // value for 'meetingId'
 *   },
 * });
 */
export function useRefreshMeetingLogSubscription(baseOptions: Apollo.SubscriptionHookOptions<RefreshMeetingLogSubscription, RefreshMeetingLogSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<RefreshMeetingLogSubscription, RefreshMeetingLogSubscriptionVariables>(RefreshMeetingLogDocument, options);
      }
export type RefreshMeetingLogSubscriptionHookResult = ReturnType<typeof useRefreshMeetingLogSubscription>;
export type RefreshMeetingLogSubscriptionResult = Apollo.SubscriptionResult<RefreshMeetingLogSubscription>;