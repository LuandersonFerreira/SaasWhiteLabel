import { Breadcrumb } from "antd";
import PropTypes from "prop-types";

const Breadcrumbs = ({ location }) => {
  const pathSnippets = location.pathname.split("/").filter((i) => i);
  const breadcrumbItems = [
    { title: "Home", path: "/" },
    ...pathSnippets.map((snippet, index) => ({
      title: snippet,
      path: `/${pathSnippets.slice(0, index + 1).join("/")}`,
    })),
  ];

  return (
    <Breadcrumb
      items={breadcrumbItems.map(({ title, path }) => ({
        title,
        href: path,
      }))}
    />
  );
};

Breadcrumbs.propTypes = {
  location: PropTypes.bool.isRequired,
  isSmallScreen: PropTypes.bool.isRequired,
};

export default Breadcrumbs;
