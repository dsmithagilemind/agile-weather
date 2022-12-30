import { Prisma } from '@prisma/client'



const ModelValidators = {

  Station: {
    // where: (props) => Prisma.validator<Prisma.StationWhereInput>(),
    // orderBy: (props) => Prisma.validator<Prisma.StationOrderByWithAggregationInput>(props)
    where: (query) => { return query satisfies Prisma.StationWhereInput},
  }

}
