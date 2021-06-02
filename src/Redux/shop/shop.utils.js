
// mock product pagination object that can be expanded for product pagination
export const createInitialProductPagination = (productsCount, CountToShowPerPage) => {

    let productsToShowPerPage = CountToShowPerPage ? CountToShowPerPage : 10

    let totalPages = Math.ceil(productsCount / productsToShowPerPage)

    return {
        totalRecords: productsCount,
        showPerPage: productsToShowPerPage,
        totalPages,
        currentPage: 1
    }


}