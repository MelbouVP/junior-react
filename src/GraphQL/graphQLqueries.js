
import { Query, Field } from '@tilework/opus'

export const CategoryDataQuery = (categoryName = "") => {

    return new Query('category')
        .addArgument('input', 'CategoryInput', { title: categoryName } )
        .addField('name')
        .addField(
            new Field('products', true)
            .addFieldList(['name', 'inStock'])
        )
}