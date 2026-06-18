import { prisma } from '@/lib/prisma';

type NumberKind = 'customer' | 'object' | 'calculation' | 'offer' | 'contract' | 'document';

const prefixes: Record<NumberKind, string> = {
  customer: 'K',
  object: 'O',
  calculation: 'KAL',
  offer: 'ANG',
  contract: 'VTR',
  document: 'DOK',
};

export async function nextNumber(kind: NumberKind) {
  const year = new Date().getFullYear();
  const prefix = `${prefixes[kind]}-${year}-`;
  const sources = {
    customer: () => prisma.customer.findFirst({ where: { customerNumber: { startsWith: prefix } }, orderBy: { customerNumber: 'desc' }, select: { customerNumber: true } }),
    object: () => prisma.serviceObject.findFirst({ where: { objectNumber: { startsWith: prefix } }, orderBy: { objectNumber: 'desc' }, select: { objectNumber: true } }),
    calculation: () => prisma.calculation.findFirst({ where: { calculationNumber: { startsWith: prefix } }, orderBy: { calculationNumber: 'desc' }, select: { calculationNumber: true } }),
    offer: () => prisma.offer.findFirst({ where: { offerNumber: { startsWith: prefix } }, orderBy: { offerNumber: 'desc' }, select: { offerNumber: true } }),
    contract: () => prisma.contract.findFirst({ where: { contractNumber: { startsWith: prefix } }, orderBy: { contractNumber: 'desc' }, select: { contractNumber: true } }),
    document: () => prisma.objectDocument.findFirst({ where: { documentNumber: { startsWith: prefix } }, orderBy: { documentNumber: 'desc' }, select: { documentNumber: true } }),
  };
  const last = await sources[kind]();
  const value = last ? Object.values(last)[0] : undefined;
  const sequence = typeof value === 'string' ? Number(value.split('-').pop()) + 1 : 1;
  return `${prefix}${String(sequence).padStart(4, '0')}`;
}
