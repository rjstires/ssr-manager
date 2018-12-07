import CircularProgress from '@material-ui/core/CircularProgress';
import { withRouter } from 'next/router';
import React from 'react';
import Layout from '../../components/Layout';
import { getLinode } from '../../services/linodes';
import { NextContext } from 'next';

interface Props {
  loading: boolean;
  linode: Linode.Instance;
  error?: Error;
}

class LinodePage extends React.PureComponent<Props> {
  static defaultProps = {
    linode: undefined,
    error: undefined,
    loading: true,
  }

  static getInitialProps = (ctx: NextContext) => {
    const { query } = ctx;
    const { linodeId } = query;

    return getLinode(ctx, linodeId as string)
      .then(linode => ({
        loading: false,
        error: undefined,
        linode,
      }))
      .catch((error) => ({
        loading: false,
        error,
        linode: undefined,
      }));
  }

  render() {
    const { linode, error, loading } = this.props;

    if (error) {
      throw error;
    }

    if (loading) {
      return <CircularProgress />
    }

    return (
      <Layout>
        <h1>Linode #{linode.id}</h1>
      </Layout>
    )
  }
}

export default withRouter<Props>(LinodePage);

