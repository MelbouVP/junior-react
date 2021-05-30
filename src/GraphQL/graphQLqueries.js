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
            .addFieldList(['name', 'inStock'])
        )
}


export const CurrencyQuery = new Query('currencies')