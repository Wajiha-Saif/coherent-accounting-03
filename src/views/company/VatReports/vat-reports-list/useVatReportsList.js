import { ref, watch, computed } from '@vue/composition-api'
import store from '@/store'

// Notification
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default function useInvoicesList() {
    // Use toast
    const toast = useToast()

    const refVatReportsTable = ref(null)

    // Table Handlers 
    const tableColumns = [
        { key: 'id', label: '#', sortable: true },
        { key: 'cell01', label: 'cell-01', sortable: true },
        { key: 'cell20', label: 'cell-20', sortable: true },
        { key: 'cell30',label: 'cell-30', sortable: true },
        { key: 'cell31', label: 'cell-31', sortable: true },
        { key: 'cell40', label: 'cell-40',sortable: true },
        { key: 'cell50', label: 'cell-50',sortable: true },
        { key: 'cell60', label: 'cell-60',sortable: true },
        { key: 'cell70', label: 'cell-70',sortable: true },
        { key: 'cell71', label: 'cell-71',sortable: true },
        { key: 'actions' },
    ]

    const perPage = ref(10)
    const totalVatReports = ref(0)
    const currentPage = ref(1)
    const perPageOptions = [10, 25, 50, 100]
    const searchQuery = ref('')
    const sortBy = ref('id')
    const isSortDirDesc = ref(true)
    const statusFilter = ref(null)
    const companyId = ref(null)

    const dataMeta = computed(() => {
        const localItemsCount = refVatReportsTable.value ? refVatReportsTable.value.localItems.length : 0
        return {
            from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
            to: perPage.value * (currentPage.value - 1) + localItemsCount,
            of: totalVatReports.value,
        }
    })

    const refetchData = () => {
        refVatReportsTable.value.refresh()
    }

    watch([currentPage, perPage, searchQuery, statusFilter], () => {
        refetchData()
    })

    //fetching vat reports list
    const fetchVatReports = (ctx, callback) => {
        store
            .dispatch('vat-reports/fetchVatReports', {
                sortField: sortBy.value,
                direction: isSortDirDesc.value,
                currentPage: currentPage.value,
                perPage: perPage.value,
                q: searchQuery.value, 
                companyId: companyId.value

            })
            .then(response => {
                const { elements, totalElements } = response.data

                callback(elements)
                totalVatReports.value = totalElements
            })
            .catch((err) => {
                toast({
                    component: ToastificationContent,
                    props: {
                        title: "Error fetching vat reports",
                        icon: 'AlertTriangleIcon',
                        variant: 'danger',
                    },
                })
            })
    }

    return {
        fetchVatReports,
        tableColumns,
        perPage,
        currentPage,
        companyId,
        totalVatReports,
        dataMeta,
        perPageOptions,
        searchQuery,
        sortBy,
        isSortDirDesc,
        refVatReportsTable,
        statusFilter,
        refetchData,
    }

}