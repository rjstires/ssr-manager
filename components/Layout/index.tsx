import { Button } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import Head from 'next/head';
import Link, { LinkProps } from 'next/link';
import { omit, pick } from 'ramda';
import React from 'react';
import authenticate from './authenticate';
import styled, { Styles } from './index.styles';

type ListItemLinkProps = Omit<ListItemProps, 'href' | 'onError'> & Omit<LinkProps, 'children'>;

const listLinkProps = ['prefetch', 'shallow', 'scroll', 'replace', 'onError', 'href', 'as', 'passHref']

const ListItemLink: React.StatelessComponent<ListItemLinkProps> = (props) => {
  const linkProps = pick(listLinkProps, props);
  const listItemProps = omit(listLinkProps, props);

  return (
    <Link {...linkProps}>
      <ListItem button component="a" {...listItemProps}></ListItem>
    </Link>
  );
};

interface Props {
  title: string;
}

type CombinedProps =
  & Props
  & Styles;

class Layout extends React.Component<CombinedProps> {
  static defaultProps = {
    title: 'Linode Manager',
  }

  static getInitialProps = (ctx) => {
    return { something: false };
  }

  state = { open: true };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    console.log(this.props);
    const { classes, title } = this.props;
    const { open } = this.state;

    return (
      <>
        <Head>
          <title>{title}</title>
          <link rel="icon" type="image/x-icon" href="/static/favicon.ico" />
        </Head>
        <div className={classes.root} id="appRoot">
          <AppBar
            position="fixed"
            className={classNames(classes.appBar, {
              [classes.appBarShift]: open,
            })}
          >
            <Toolbar disableGutters={!open}>
              <Typography variant="h6" color="inherit" noWrap style={{ flexGrow: 1 }}>
                Manager
              </Typography>
              <Link href="/logout">
                <Button>Logout</Button>
              </Link>
            </Toolbar>
          </AppBar>
          <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.drawerHeader} />
            <List>
              <ListItemLink href={`/linodes`}>
                <ListItemText primary="Linodes" />
              </ListItemLink>
            </List>
          </Drawer>
          <main
            className={classNames(classes.content, {
              [classes.contentShift]: open,
            })}
          >
            <div className={classes.drawerHeader} />
            {this.props.children}
          </main>
        </div>
      </>
    );
  }
}


export default authenticate(styled(Layout));
