import SchemaBuilder from '../../graphql/builder';
import * as transferRepository from './transferRepository';
import { Transfer } from '@/generated/prisma/client';

const augmentSchema = (builder: typeof SchemaBuilder) => {
  const TransferRef = builder.prismaObject('Transfer', {
    fields: (t) => ({
      id: t.exposeID('id'),
      amount: t.exposeFloat('amount'),
      date: t.string({
        resolve: (parent: Transfer) => parent.date.toISOString(),
      }),
      source: t.relation('source'),
      target: t.relation('target'),
    }),
  });

  builder.queryType({
    fields: (t) => ({
      transfer: t.field({
        type: TransferRef,
        args: {
          id: t.arg.int({ required: true }),
        },
        resolve: async (_root, args, _ctx, _info) => {
          return transferRepository.getTransferById(args.id as number);
        },
      }),
    }),
  });

  builder.mutationType({
    fields: (t) => ({
      createTransfer: t.field({
        type: TransferRef,
        args: {
          amount: t.arg.float({ required: true }),
          date: t.arg({ type: 'String', required: true }),
          sourceId: t.arg.int({ required: true }),
          targetId: t.arg.int({ required: true }),
        },
        resolve: async (_parent, args, _context, _info) => {
          const { amount, date, sourceId, targetId } = args;
          const parsedDate = new Date(date);
          return transferRepository.createTransfer({ amount, date: parsedDate, sourceId, targetId });
        },
      }),
    }),
  });
};

export default augmentSchema;