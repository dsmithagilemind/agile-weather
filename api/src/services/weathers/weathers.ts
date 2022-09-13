import type {
  QueryResolvers,
  MutationResolvers,
  WeatherResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const weathers: QueryResolvers['weathers'] = () => {
  return db.weather.findMany()
}

export const weather: QueryResolvers['weather'] = ({ id }) => {
  return db.weather.findUnique({
    where: { id },
  })
}

export const createWeather: MutationResolvers['createWeather'] = ({
  input,
}) => {
  return db.weather.create({
    data: input,
  })
}

export const updateWeather: MutationResolvers['updateWeather'] = ({
  id,
  input,
}) => {
  return db.weather.update({
    data: input,
    where: { id },
  })
}

export const deleteWeather: MutationResolvers['deleteWeather'] = ({ id }) => {
  return db.weather.delete({
    where: { id },
  })
}

export const Weather: WeatherResolvers = {
  station: (_obj, { root }) =>
    db.weather.findUnique({ where: { id: root.id } }).station(),
}
