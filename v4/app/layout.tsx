import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "电梯百科 V4 | Next.js 路由版",
  description:
    "电梯百科展示网站 V4：支持国家/品牌/类型筛选，列表与详情页路由，使用 Next.js 构建并提供可抓取内容。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
