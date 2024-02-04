/**
 * fruit controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::fruit.fruit', ({ strapi }) => ({
    async findOne(ctx) {
      const { id } = ctx.params
      const entity = await strapi.db.query('api::fruit.fruit').findOne({
        where: { slug: id },
        populate: ['image', 'tags', 'imgfruit'],
      })
      const sanitizedEntity = await this.sanitizeOutput(entity, ctx)
      return this.transformResponse(sanitizedEntity)
    }
}));