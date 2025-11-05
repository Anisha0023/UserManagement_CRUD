import React from "react";

interface BreadcrumbProps {
  items: { label: string; active?: boolean }[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="text-sm text-gray-500 mb-4 flex items-center space-x-1 select-none cursor-pointer">
      {items.map((item, index) => (
        <span key={index} className="flex items-center">
          <span
            className={`${
              item.active
                ? "text-gray-900 font-medium"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {item.label}
          </span>
          {index < items.length - 1 && (
            <span className="mx-1 text-gray-400">›</span>
          )}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;
