module.exports = [
  {
    sequence: 1,
    name: "Ván mặt, Khung xương",
    note: "Ván mặt chuẩn bị theo: QTNT-01/HD-01: HD ép laminate",
    worksheet:
      "Kích thước tấm mặt cắt theo bản vẽ, để độ dư gia công mỗi chiều là 2-4mm.",
    active: true,
    RoutingId: 1,
    WorkcenterId: 1
  },
  {
    sequence: 2,
    name: "Ép mặt lên khung xương",
    note:
      "Sản phẩm ép xong không bị bong tách, keo xì đều lắp mỏng bên mép cạnh",
    worksheet:
      "Trách nhiệm: Xưởng sản xuất Ép mặt lên khung xương theo: QTNT-01/HD-02.",
    active: true,
    RoutingId: 1,
    WorkcenterId: 2
  },
  {
    sequence: 3,
    name: "Dán cạnh",
    note: "Cạnh sau khi dán không bị bong tách, không bị mẻ, không gọt vào mặt",
    worksheet: "Trách nhiệm: Xưởng sản xuất.",
    active: true,
    RoutingId: 1,
    WorkcenterId: 3
  },
  {
    sequence: 4,
    name: "Gia công phần lắp PK và họa tiết trang trí",
    note:
      "Gia công đúng mã phụ kiện, kích thước bản vẽ chỉ định. Đúng chiều mở, số lượng mã, bộ",
    worksheet: "Trách nhiệm: Bộn phận Tinh chế.",
    active: true,
    RoutingId: 1,
    WorkcenterId: 4
  },
  {
    sequence: 5,
    name: "Đóng gói chờ xuất hàng",
    note: "Kích thước: trong dung sai",
    worksheet: "Trách nhiệm: QC",
    active: true,
    RoutingId: 1,
    WorkcenterId: 5
  }
];
