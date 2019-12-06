import React from "react";

import Layout from "../../components/Layout";
import Playground from "../../components/Playground";
import ActionPanel from "../../components/ActionPanel";

export default () => {
  return (
    <Layout>
      <Playground />
      <ActionPanel />
    </Layout>
  );
};
