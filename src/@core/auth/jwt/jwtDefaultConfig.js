export default {
  // Endpoints
  loginEndpoint: '/userauth/oauth/token',
  clientToken: "/userauth/oauth/token",
  countryToken: "/account/api/countries",
  // registerEndpoint: '/jwt/register',
  registerEndpoint: '/account/api/user/create',
  verifyToken:"/account/api/forgot-password",
  resetPasswordRequestEndpoint: '/account/api/forgot-password',
  resetPasswordEndpoint: '/account/api/save-forgot-password',
  refreshEndpoint: '/jwt/refresh-token',
  logoutEndpoint: '/jwt/logout',
  invoiceAddEndpoint: '/account/api/user-invoice/create',
  invoiceEditEndpoint: '/account/api/user-invoice',
  invoiceDeleteEndpoint: '/account/api/user-invoice',
  UserEditEndpoint: '/account/api/user-person',
  UserDeleteEndpoint: '/account/api/user-person',
  SearchCompanyEndpoint: '/index/api/search-companies/search-by-name',
  SearchEicEndpoint: '/index/api/search-companies',
  SearchEicPerson: '/account/api/user-person/search/1/100',
  
  CompanyInvoiceAddEndpoint: '/account/api/invoice/create',
  companyInvoiceEditEndpoint: '/account/api/invoice',
  companyInvoiceDeleteEndpoint: '/account/api/invoice',
  UserCompanyDeleteEndpoint: '/account/api/person',
  UserCompanyEditEndpoint: '/account/api/person',

  searchEicPersonCompanies: '/account/api/person/search',
  fileInvoiceEndpoint: '/index/api/invoice/ocr',
  multipleFileInvoiceEndpoint: '/index/api/multiple/invoice/ocr',

  // Vat-Reports
  VatReportAddEndPoint: '/account/api/report/create',
  VatReportEditEndPoint: '/account/api/report/update',
  VatReportDeleteEndPoint: '/account/api/report',

  // Genearte invoice-for-report
  GetInvoicesForReportEndPoint: '/account/api/calculation/get-invoices-for-report',
  CreateVatReportZipFileEndPoint: '/account/api/calculation/create-vat-report',

  getCompanies: '/api/company/list/1/10',
  // This will be prefixed in authorization header with token
  // e.g. Authorization: Bearer <token>
  tokenType: 'Bearer',

  // Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'accessToken',
  storageRefreshTokenKeyName: 'refreshToken',
}
