import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Users,
  ShoppingBag,
  TrendingUp,
  DollarSign,
  Settings,
  BarChart3,
  Package,
  UserCheck,
  Menu,
  X,
} from "lucide-react";
import UsersList from "../../components/admin/UsersList";
import UserForm from "../../components/admin/UserForm";
import UserDetail from "../../components/admin/UserDetail";
import ProductsList from "../../components/admin/ProductsList";
import ProductForm from "../../components/admin/ProductForm";
import ProductDetail from "../../components/admin/ProductDetail";

const AdminPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [activeView, setActiveView] = useState("users");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserForm, setShowUserForm] = useState(false);
  const [showUserDetail, setShowUserDetail] = useState(false);
  const [formMode, setFormMode] = useState("add");

  // Product states
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductForm, setShowProductForm] = useState(false);
  const [showProductDetail, setShowProductDetail] = useState(false);
  const [productFormMode, setProductFormMode] = useState("add");

  // Mobile sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Check admin access on component mount
  useEffect(() => {
    if (!isAuthenticated || user?.username !== "admin") {
      navigate("/login");
      return;
    }
  }, [isAuthenticated, user, navigate]);

  // If not admin, don't render anything (will redirect)
  if (!isAuthenticated || user?.username !== "admin") {
    return null;
  }

  // Navigation items
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "users", label: "Người dùng", icon: Users },
    { id: "products", label: "Sản phẩm", icon: Package },
    { id: "orders", label: "Đơn hàng", icon: ShoppingBag },
    { id: "settings", label: "Cài đặt", icon: Settings },
  ];

  // Stats data
  const stats = [
    {
      title: "Tổng người dùng",
      value: "10",
      change: "+12%",
      changeType: "increase",
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Tổng sản phẩm",
      value: "20",
      change: "+8%",
      changeType: "increase",
      icon: Package,
      color: "bg-green-500",
    },
    {
      title: "Đơn hàng",
      value: "156",
      change: "+23%",
      changeType: "increase",
      icon: ShoppingBag,
      color: "bg-purple-500",
    },
    {
      title: "Doanh thu",
      value: "$12,847",
      change: "+18%",
      changeType: "increase",
      icon: DollarSign,
      color: "bg-yellow-500",
    },
  ];

  // Handle user actions
  const handleEditUser = (user) => {
    setSelectedUser(user);
    setFormMode("edit");
    setShowUserForm(true);
    setShowUserDetail(false);
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setShowUserDetail(true);
  };

  const handleAddUser = () => {
    setSelectedUser(null);
    setFormMode("add");
    setShowUserForm(true);
  };

  const handleSaveUser = (userData) => {
    console.log("User saved:", userData);
    // Refresh users list or update state
  };

  const handleCloseModals = () => {
    setShowUserForm(false);
    setShowUserDetail(false);
    setSelectedUser(null);
  };

  // Handle product actions
  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setProductFormMode("edit");
    setShowProductForm(true);
    setShowProductDetail(false);
  };

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setShowProductDetail(true);
  };

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setProductFormMode("add");
    setShowProductForm(true);
  };

  const handleSaveProduct = (productData) => {
    console.log("Product saved:", productData);
    // Refresh products list or update state
  };

  const handleCloseProductModals = () => {
    setShowProductForm(false);
    setShowProductDetail(false);
    setSelectedProduct(null);
  };

  // Render dashboard content
  const renderDashboard = () => (
    <div className="space-y-4 lg:space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-xs lg:text-sm text-gray-600 truncate">
                  {stat.title}
                </p>
                <p className="text-lg lg:text-2xl font-semibold text-gray-900">
                  {stat.value}
                </p>
                <div className="flex items-center mt-1 lg:mt-2">
                  <TrendingUp className="h-3 w-3 lg:h-4 lg:w-4 text-green-500 mr-1" />
                  <span className="text-xs lg:text-sm text-green-600">
                    {stat.change}
                  </span>
                  <span className="hidden sm:inline text-xs lg:text-sm text-gray-500 ml-1">
                    so với tháng trước
                  </span>
                </div>
              </div>
              <div
                className={`w-8 h-8 lg:w-12 lg:h-12 ${stat.color} rounded-lg flex items-center justify-center ml-2`}
              >
                <stat.icon className="h-4 w-4 lg:h-6 lg:w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm p-4 lg:p-6">
        <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-3 lg:mb-4">
          Thao tác nhanh
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
          <button
            onClick={() => setActiveView("users")}
            className="flex items-center space-x-3 p-3 lg:p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
          >
            <UserCheck className="h-6 w-6 lg:h-8 lg:w-8 text-blue-500 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="font-medium text-gray-900 text-sm lg:text-base">
                Quản lý người dùng
              </div>
              <div className="text-xs lg:text-sm text-gray-500">
                Xem và chỉnh sửa người dùng
              </div>
            </div>
          </button>

          <button
            onClick={() => setActiveView("products")}
            className="flex items-center space-x-3 p-3 lg:p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
          >
            <Package className="h-6 w-6 lg:h-8 lg:w-8 text-green-500 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="font-medium text-gray-900 text-sm lg:text-base">
                Quản lý sản phẩm
              </div>
              <div className="text-xs lg:text-sm text-gray-500">
                Thêm và cập nhật sản phẩm
              </div>
            </div>
          </button>

          <button
            onClick={() => setActiveView("orders")}
            className="flex items-center space-x-3 p-3 lg:p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left md:col-span-2 lg:col-span-1"
          >
            <ShoppingBag className="h-6 w-6 lg:h-8 lg:w-8 text-purple-500 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="font-medium text-gray-900 text-sm lg:text-base">
                Xem đơn hàng
              </div>
              <div className="text-xs lg:text-sm text-gray-500">
                Theo dõi đơn hàng mới
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm p-4 lg:p-6">
        <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-3 lg:mb-4">
          Hoạt động gần đây
        </h3>
        <div className="space-y-3 lg:space-y-4">
          <div className="flex items-center space-x-3 lg:space-x-4 p-2 lg:p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900">Người dùng mới đã đăng ký</p>
              <p className="text-xs text-gray-500">2 phút trước</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 lg:space-x-4 p-2 lg:p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900">Đơn hàng mới được tạo</p>
              <p className="text-xs text-gray-500">5 phút trước</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 lg:space-x-4 p-2 lg:p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0"></div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900">Sản phẩm đã được cập nhật</p>
              <p className="text-xs text-gray-500">10 phút trước</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render content based on active view
  const renderContent = () => {
    switch (activeView) {
      case "users":
        return (
          <UsersList
            onEdit={handleEditUser}
            onView={handleViewUser}
            onAdd={handleAddUser}
          />
        );
      case "products":
        return (
          <ProductsList
            onEdit={handleEditProduct}
            onView={handleViewProduct}
            onAdd={handleAddProduct}
          />
        );
      case "orders":
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Quản lý đơn hàng
            </h2>
            <p className="text-gray-600">
              Tính năng này sẽ được phát triển sớm...
            </p>
          </div>
        );
      case "settings":
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Cài đặt hệ thống
            </h2>
            <p className="text-gray-600">
              Tính năng này sẽ được phát triển sớm...
            </p>
          </div>
        );
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="flex relative">
        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={`
          fixed lg:static inset-y-0 left-0 z-50 lg:z-auto
          w-64 bg-white shadow-sm min-h-screen transform transition-transform duration-300 ease-in-out
          ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
          mt-16 lg:mt-0
        `}
        >
          <div className="p-4 lg:p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-lg lg:text-xl font-bold text-gray-900">
                  Admin Panel
                </h1>
                <p className="text-xs lg:text-sm text-gray-600">
                  Quản trị hệ thống
                </p>
              </div>
              {/* Close button for mobile */}
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden p-2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <nav className="p-3 lg:p-4">
            <ul className="space-y-1 lg:space-y-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveView(item.id);
                      setIsSidebarOpen(false); // Close sidebar on mobile after selection
                    }}
                    className={`w-full flex items-center space-x-2 lg:space-x-3 px-3 lg:px-4 py-2 lg:py-3 rounded-lg transition-colors text-sm lg:text-base ${
                      activeView === item.id
                        ? "bg-blue-50 text-blue-700 border-blue-200"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <item.icon className="h-4 w-4 lg:h-5 lg:w-5 flex-shrink-0" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          {/* Mobile Header */}
          <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div className="text-center">
                <h1 className="text-lg font-semibold text-gray-900">
                  {navItems.find((item) => item.id === activeView)?.label ||
                    "Dashboard"}
                </h1>
              </div>
              <div className="w-9 h-9"></div> {/* Spacer for centering */}
            </div>
          </div>

          <div className="p-4 lg:p-6">
            <div className="max-w-7xl mx-auto">
              {/* Desktop Header */}
              <div className="hidden lg:block mb-6">
                <h1 className="text-2xl font-bold text-gray-900">
                  {navItems.find((item) => item.id === activeView)?.label ||
                    "Dashboard"}
                </h1>
                <p className="text-gray-600">
                  {activeView === "dashboard" &&
                    "Tổng quan hệ thống và thống kê"}
                  {activeView === "users" && "Quản lý thông tin người dùng"}
                  {activeView === "products" && "Quản lý sản phẩm và danh mục"}
                  {activeView === "orders" && "Theo dõi và xử lý đơn hàng"}
                  {activeView === "settings" && "Cấu hình hệ thống"}
                </p>
              </div>

              {/* Content */}
              {renderContent()}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <UserForm
        user={selectedUser}
        isOpen={showUserForm}
        onClose={handleCloseModals}
        onSave={handleSaveUser}
        mode={formMode}
      />

      <UserDetail
        user={selectedUser}
        isOpen={showUserDetail}
        onClose={handleCloseModals}
        onEdit={handleEditUser}
      />

      <ProductForm
        product={selectedProduct}
        isOpen={showProductForm}
        onClose={handleCloseProductModals}
        onSave={handleSaveProduct}
        mode={productFormMode}
      />

      <ProductDetail
        product={selectedProduct}
        isOpen={showProductDetail}
        onClose={handleCloseProductModals}
        onEdit={handleEditProduct}
      />
    </div>
  );
};

export default AdminPage;
