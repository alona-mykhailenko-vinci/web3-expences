import builder from './builder';
import augmentExpenseSchema from '../api/expense/augmentGraphqlSchema';
import augmentUserSchema from '../api/user/augmentGraphqlSchema';
import augmentTransferSchema from '../api/transfer/augmentGraphqlSchema';

augmentExpenseSchema(builder);
augmentUserSchema(builder);
augmentTransferSchema(builder);

const schema = builder.toSchema();
export default schema;