import { Query, Field } from '@tilework/opus'

// fetches product data based on category name
export const CategoryDataQuery = (categoryName) => {
    // if category name is all then fetches all product data
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


// Fetch list of available currencies
export const CurrencyQuery = new Query('currencies')