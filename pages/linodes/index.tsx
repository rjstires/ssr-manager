import { CircularProgress } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { NextContext } from 'next';
import Link from 'next/link';
import React from 'react';
import { connect } from 'react-redux';
import Layout from '../../components/Layout';
import { requestLinodes } from '../../src/store/linodes';

const LinodeLink = ({ id, label }) =>
  <Link as={`/linodes/${id}`} href={`/linode?linodeId=${id}`} prefetch><a>{label}</a></Link>

interface Props { }

type CombinedProps = Props & StateProps;

class LinodesPage extends React.PureComponent<CombinedProps> {
  static defaultProps = {
    linodes: [],
  }

  static getInitialProps = (ctx: NextContext) => {
    const { dispatch } = ctx.store;

    return dispatch(requestLinodes(ctx))
      .then(() => ({}));
  }

  render() {
    const { loading, data, error } = this.props;

    if (error) {
      throw error;
    }

    if (loading) {
      return <CircularProgress />
    }

    return (
      <Layout>
        <h1>List Linodes</h1>
        <Table>
          <TableBody>
            {data.map((linode) => (
              <TableRow key={linode.label}>
                <TableCell>
                  <LinodeLink id={linode.id} label={linode.label} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Layout>
    )
  }
}
interface StateProps {
  data: Linode.Instance[];
  error: Error;
  loading: boolean;
}

const connected = connect((state: ApplicationState) => ({ ...state.linodes }));

export default connected(LinodesPage);
