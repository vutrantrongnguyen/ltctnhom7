import React from 'react';


const Breadcrumbs = React.lazy(() => import('./views/Base/Breadcrumbs'));
const Cards = React.lazy(() => import('./views/Base/Cards'));
const Carousels = React.lazy(() => import('./views/Base/Carousels'));
const Collapses = React.lazy(() => import('./views/Base/Collapses'));
const Dropdowns = React.lazy(() => import('./views/Base/Dropdowns'));
const Forms = React.lazy(() => import('./views/Base/Forms'));
const Jumbotrons = React.lazy(() => import('./views/Base/Jumbotrons'));
const ListGroups = React.lazy(() => import('./views/Base/ListGroups'));
const Navbars = React.lazy(() => import('./views/Base/Navbars'));
const Navs = React.lazy(() => import('./views/Base/Navs'));
const Paginations = React.lazy(() => import('./views/Base/Paginations'));
const Popovers = React.lazy(() => import('./views/Base/Popovers'));
const ProgressBar = React.lazy(() => import('./views/Base/ProgressBar'));
const Switches = React.lazy(() => import('./views/Base/Switches'));
const Tables = React.lazy(() => import('./views/Base/Tables'));
const Tabs = React.lazy(() => import('./views/Base/Tabs'));
const Tooltips = React.lazy(() => import('./views/Base/Tooltips'));
const BrandButtons = React.lazy(() => import('./views/Buttons/BrandButtons'));
const ButtonDropdowns = React.lazy(() => import('./views/Buttons/ButtonDropdowns'));
const ButtonGroups = React.lazy(() => import('./views/Buttons/ButtonGroups'));
const Buttons = React.lazy(() => import('./views/Buttons/Buttons'));
const Charts = React.lazy(() => import('./views/Charts'));
const Dashboard = React.lazy(() => import('./views/Dashboard'));
const CoreUIIcons = React.lazy(() => import('./views/Icons/CoreUIIcons'));
const Flags = React.lazy(() => import('./views/Icons/Flags'));
const FontAwesome = React.lazy(() => import('./views/Icons/FontAwesome'));
const SimpleLineIcons = React.lazy(() => import('./views/Icons/SimpleLineIcons'));
const Alerts = React.lazy(() => import('./views/Notifications/Alerts'));
const Badges = React.lazy(() => import('./views/Notifications/Badges'));
const Modals = React.lazy(() => import('./views/Notifications/Modals'));
const Colors = React.lazy(() => import('./views/Theme/Colors'));
const Typography = React.lazy(() => import('./views/Theme/Typography'));
const Widgets = React.lazy(() => import('./views/Widgets/Widgets'));

const Users = React.lazy(() => import('./views/Users/Users'));
const User = React.lazy(() => import('./views/Users/User'));
const Investors = React.lazy(() => import('./views/Giga/Investors/Investors'));
// const Agencies = React.lazy(() => import('./views/Giga/Agencies/Agencies'));
// const Facilities = React.lazy(() => import('./views/Giga/Facilities/Facilities'));
// const GeneralList = React.lazy(() => import('./views/Giga/GeneralList/GeneralList'));
// const ProjectDetail = React.lazy(() => import('./views/Giga/ProjectDetail/ProjectDetail'));
// const CondoDistribution = React.lazy(() => import('./views/Giga/CondoDistribution/CondoDistribution'));
// const CondoStatus = React.lazy(() => import('./views/Giga/CondoStatus/CondoStatus'));
// const CondoUpdate = React.lazy(() => import('./views/Giga/CondoUpdate/CondoUpdate'));
// const CustomerCondoManagement = React.lazy(() => import('./views/Giga/CustomerCondoManagement/CustomerCondoManagement'));
// const ProjectManagement = React.lazy(() => import('./views/Giga/ProjectManagement/ProjectManagement'));
// const Properties = React.lazy(() => import('./views/Giga/Properties/Properties'));
// const AdminAgencyAccounts = React.lazy(() => import('./views/Giga/AdminAgencyAccounts/AdminAgencyAccounts'));
// const BrockerAccounts = React.lazy(() => import('./views/Giga/BrockerAccounts/BrockerAccounts'));
// const AdminInvestorAccounts = React.lazy(() => import('./views/Giga/AdminInvestorAccounts/AdminInvestorAccounts'));
// const AdminAccounts = React.lazy(() => import('./views/Giga/AdminAccounts/AdminAccounts'));
// const Reports = React.lazy(() => import('./views/Giga/Reports/Reports'));
// const AddInvestor = React.lazy(() => import('./views/Giga/Investors/AddInvestor/AddInvestor'));
// const EditInvestor = React.lazy(() => import('./views/Giga/Investors/EditInvestor'));
// const EditAgency = React.lazy(() => import('./views/Giga/Agencies/EditAgency'));
// const AddAgency = React.lazy(() => import('./views/Giga/Agencies/AddAgency/AddAgency'));
// const TransactionDetail = React.lazy(() => import('./views/Giga/TransactionDetail/TransactionDetail'));
// const PropertyDetail = React.lazy(() => import('./views/Giga/PropertyDetail/PropertyDetail'));
// const AdminViewInvestors = React.lazy(() => import('./views/Giga/Investors/AdminViewInvestors'));
// const InvestorReports = React.lazy(() => import('./views/Giga/Reports/InvestorReports'));
// const AgencyReports = React.lazy(() => import('./views/Giga/Reports/AgencyReports'));
// const ComplainDetail = React.lazy(() => import('./views/Giga/ComplainDetail/ComplainDetail'));
// const MyEditor = React.lazy(() => import('./views/Giga/Editor/MyEditor'));
// const CreateProject = React.lazy(() => import('./views/Giga/ProjectDetail/CreateProject'));
// const EditProject = React.lazy(() => import('./views/Giga/ProjectDetail/EditProject'));
// const GeneralListAdmin2 = React.lazy(() => import('./views/Giga/GeneralList/GeneralListAdmin2'));
// const GeneralListAdmin3 = React.lazy(() => import('./views/Giga/GeneralList/GeneralListAdmin3'));
// const CondoDistributionAgency = React.lazy(() => import('./views/Giga/CondoDistribution/CondoDistributionAgency'));
// const EditInvestorCompany = React.lazy(() => import('./views/Giga/Investors/EditInvestorCompany'));
// const EditAgencyCompany = React.lazy(() => import('./views/Giga/Agencies/EditAgencyCompany'));
// const AdminViewAgencies = React.lazy(() => import('./views/Giga/Agencies/AdminViewAgencies'));
// const Complains = React.lazy(() => import('./views/Giga/Complains/Complains'));
const UserAccounts = React.lazy(() => import('./views/Giga/UserAccounts/UserAccounts'));
const CreateUser = React.lazy(() => import('./views/Giga/UserAccounts/CreateUser'));
const Products = React.lazy(() => import('./views/Giga/Products/Products'));
const CreateProduct = React.lazy(() => import('./views/Giga/Products/CreateProduct'));
const Deliveries = React.lazy(() => import('./views/Giga/Deliveries/Deliveries'));
const Orders = React.lazy(() => import('./views/Giga/Orders/Orders'));
const Banners = React.lazy(() => import('./views/Giga/Banners/Banners'));
const CSKH = React.lazy(() => import('./views/Giga/CSKH/cskh'));
const Search = React.lazy(() => import('./views/Giga/Search/Search'));
const AccountDetail = React.lazy(() => import('./views/Giga/AccountDetail/AccountDetail'));
const ProductDetail = React.lazy(() => import('./views/Giga/ProductDetail/ProductDetail'));
const DeliveryDetail = React.lazy(() => import('./views/Giga/DeliveryDetail/DeliveryDetail'));
const OrderDetail = React.lazy(() => import('./views/Giga/OrderDetail/OrderDetail'));
const Data = React.lazy(() => import('./views/Giga/Data/Data'));
const Shop = React.lazy(() => import('./views/Giga/Shops/shops'));
// const BannerDetail = React.lazy(() => import('./views/Giga/BannerDetail/BannerDetail'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/investors', exact: true, name: 'Quản lý danh sách chủ đầu tư', component: Investors},
  { path: '/product/add', exact: true, name: 'Tạo mới sản phẩm', component: CreateProduct},
  { path: '/user/add', exact: true, name: 'Tạo mới user', component: CreateUser},
  { path: '/shops', exact: true, name: 'Quản lý giỏ hàng, thanh toán', component: Shop},
  { path: '/database', exact: true, name: 'Quản lý dữ liệu bán hàng', component: Data},
  { path: '/cskh', exact: true, name: 'Quản lý chăm sóc khách hàng', component: CSKH},
  { path: '/search', exact: true, name: 'Quản lý tìm kiếm', component: Search},
  { path: '/account/users', exact: true, name: 'Tài khoản người dùng', component: UserAccounts},
  { path: '/products', exact: true, name: 'Quản lý sản phẩm', component: Products},
  { path: '/deliveries', exact: true, name: 'Quản lý giao hàng', component: Deliveries},
  { path: '/orders', exact: true, name: 'Quản lý đơn hàng', component: Orders},
  { path: '/banners', exact: true, name: 'Quản lý quảng cáo - khuyến mại', component: Banners},
  { path: '/account/detail/:id', exact: true, name: 'Chi tiết tài khoản', component: AccountDetail},
  { path: '/product/:id', exact: true, name: 'Chi tiết sản phẩm', component: ProductDetail},
  { path: '/delivery/:id', exact: true, name: 'Chi tiết giao hàng', component: DeliveryDetail},
  { path: '/order/:id', exact: true, name: 'Chi tiết đơn hàng', component: OrderDetail},

  // { path: '/editinvestor', exact: true, name: 'Thông tin chủ đầu tư', component: EditInvestorCompany},
  // { path: '/editagency', exact: true, name: 'Thông tin công ty môi giới', component: EditAgencyCompany},
  // { path: '/agency/condo/distribution', exact: true, name: 'Quản lý giá và phân phối căn hộ', component: CondoDistributionAgency},
  // { path: '/investor/generallist', exact: true, name: 'Bảng danh sách tổng quát', component: GeneralListAdmin2},
  // { path: '/agency/generallist', exact: true, name: 'Bảng danh sách tổng quát', component: GeneralListAdmin3},
  // { path: '/project/create', exact: true, name: 'Tạo mới dự án', component: CreateProject},
  // { path: '/project/edit/:id', exact: true, name: 'Chỉnh sửa dự án', component: EditProject},
  // { path: '/editor', exact: true, name: 'wysiwyg', component: MyEditor},
  // { path: '/complain/detail/:id', exact: true, name: 'Chi tiết nội dung báo xấu', component: ComplainDetail},
  // { path: '/investor/reports', exact: true, name: 'Thống kê báo cáo', component: InvestorReports},
  // { path: '/agency/reports', exact: true, name: 'Thống kê báo cáo', component: AgencyReports},
  // { path: '/admin/investors', exact: true, name: 'Danh sách chủ đầu tư', component: AdminViewInvestors},
  // { path: '/admin/agencies', exact: true, name: 'Quản lý danh sách công ty môi giới', component: AdminViewAgencies},
  // { path: '/investor/edit/:id', exact: true, name: 'Cập nhật thông tin chủ đầu tư', component: EditInvestor},
  // { path: '/agency/edit/:id', exact: true, name: 'Cập nhật thông tin công ty môi giới', component: EditAgency},
  // { path: '/property/detail/:id', exact: true, name: 'Chi tiết tin đăng', component: PropertyDetail},
  // { path: '/transaction/detail/:id', exact: true, name: 'Chi tiết giao dịch', component: TransactionDetail},
  // { path: '/agency/add', exact: true, name: 'Thêm công ty môi giới', component: AddAgency},
  // { path: '/investor/add', exact: true, name: 'Thêm chủ đầu tư', component: AddInvestor},
  // { path: '/reports', exact: true, name: 'Thống kê báo cáo', component: Reports},
  // { path: '/account/brockers', exact: true, name: 'Tài khoản nhân viên môi giới', component: BrockerAccounts},
  // { path: '/account/admins', exact: true, name: 'Tài khoản admin của trang web', component: AdminAccounts},
  // { path: '/account/investoradmins', exact: true, name: 'Tài khoản admin của chủ đầu tư', component: AdminInvestorAccounts},
  // { path: '/account/agencyadmins', exact: true, name: 'Tài khoản admin công ty môi giới', component: AdminAgencyAccounts},
  // { path: '/properties', exact: true, name: 'Quản lý tin đăng mới', component: Properties},
  // { path: '/complains', exact: true, name: 'Quản lý tin xung đột', component: Complains},
  // { path: '/project/manage', exact: true, name: 'Quản lý bán hàng theo dự án', component: ProjectManagement},
  // { path: '/condo/update', exact: true, name: '  ', component: CondoUpdate},
  // { path: '/condo/status', exact: true, name: 'Quản lý trạng thái căn hộ', component: CondoStatus},
  // { path: '/condo/distribution', exact: true, name: 'Quản lý giá và phân phối căn hộ', component: CondoDistribution},
  // { path: '/generallist', exact: true, name: 'Bảng danh sách tổng quát', component: GeneralList},
  // { path: '/agencies', exact: true, name: 'Quản lý danh sách công ty môi giới', component: Agencies},
  // { path: '/facilities', exact: true, name: 'Danh sách tiện ích khu đô thị', component: Facilities},
  // { path: '/project/detail', exact: true, name: 'Danh sách chi tiết dự án,các dữ liệu nhập', component: ProjectDetail},
  // { path: '/customercondo/manage', exact: true, name: 'Quản lý bán theo khách hàng', component: CustomerCondoManagement},


  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/theme', exact: true, name: 'Theme', component: Colors },
  { path: '/theme/colors', name: 'Colors', component: Colors },
  { path: '/theme/typography', name: 'Typography', component: Typography },
  { path: '/base', exact: true, name: 'Base', component: Cards },
  { path: '/base/cards', name: 'Cards', component: Cards },
  { path: '/base/forms', name: 'Forms', component: Forms },
  { path: '/base/switches', name: 'Switches', component: Switches },
  { path: '/base/tables', name: 'Tables', component: Tables },
  { path: '/base/tabs', name: 'Tabs', component: Tabs },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  { path: '/base/carousels', name: 'Carousel', component: Carousels },
  { path: '/base/collapses', name: 'Collapse', component: Collapses },
  { path: '/base/dropdowns', name: 'Dropdowns', component: Dropdowns },
  { path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
  { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
  { path: '/base/navbars', name: 'Navbars', component: Navbars },
  { path: '/base/navs', name: 'Navs', component: Navs },
  { path: '/base/paginations', name: 'Paginations', component: Paginations },
  { path: '/base/popovers', name: 'Popovers', component: Popovers },
  { path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar },
  { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
  { path: '/buttons', exact: true, name: 'Buttons', component: Buttons },
  { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
  { path: '/buttons/button-dropdowns', name: 'Button Dropdowns', component: ButtonDropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
  { path: '/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons },
  { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', component: Flags },
  { path: '/icons/font-awesome', name: 'Font Awesome', component: FontAwesome },
  { path: '/icons/simple-line-icons', name: 'Simple Line Icons', component: SimpleLineIcons },
  { path: '/notifications', exact: true, name: 'Notifications', component: Alerts },
  { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  { path: '/notifications/badges', name: 'Badges', component: Badges },
  { path: '/notifications/modals', name: 'Modals', component: Modals },
  { path: '/widgets', name: 'Widgets', component: Widgets },
  { path: '/charts', name: 'Charts', component: Charts },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },

];

export default routes;
