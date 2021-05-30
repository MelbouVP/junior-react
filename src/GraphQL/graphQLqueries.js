import { Query, Field } from '@tilework/opus'

// fetches product data based on category name
// if category name is empty then fetches all product data
export const CategoryDataQuery = (categoryName) => {
    categoryName = categoryName === 'all' ? '' : categoryName

    return new Query('category')
        .addArgument('input', 'CategoryInput', { title: categoryName } )
        .addField('name')
        .addField(
            new Field('products', true)
            .addFieldList(['name', 'inStock', 'gallery', 'description', 'category'])
            .addField(
                new Field('attributes', true)
                .addFieldList(['id', 'name','type'])
                .addField(
                    new Field('items', true)
                    .addFieldList(['displayValue, value, id'])
                )
            )
            .addField(
                new Field('prices', true)
                .addFieldList(['currency', 'amount'])
            )
        )
}

export const CurrencyQuery = new Query('currencies')