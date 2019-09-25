/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { get } from 'lodash';
import { Avatar, Table, Button, Spin, Modal, Icon, Tabs } from 'antd';

import { loadAll as loadAllUsers } from 'actions/users.action';
import { UsersDetails } from 'components';
import StyleWrapper from './users.style';

type Props = {
  history: Object,
  query: Object,
  users: Object,
  loadAllUsers: () => void
};

type State = {
  visibleModal: boolean,
  userId: ?string
};

// Export this for unit testing more easily
export class Users extends PureComponent<Props, State> {
  state = {
    visibleModal: false,
    userId: null
  };

  columns = [
    {
      title: '',
      render: item => (
        <div>
          <Avatar size={64} src={item.avatar} />
        </div>
      )
    },
    {
      title: 'Full name',
      render: item => (
        <div>
          {item.first_name} {item.last_name}
        </div>
      )
    },
    {
      title: 'Email',
      dataIndex: 'email'
    },
    {
      title: '',
      className: 'text-right',
      render: (row: Object) => (
        <Button
          size="large"
          type="primary"
          shape="round"
          onClick={() => this.showDetails(row)}
        >
          Details
          <Icon type="right" />
        </Button>
      )
    }
  ];

  componentDidMount() {
    const { loadAllUsers: loadAllPromise } = this.props;
    loadAllPromise();
  }

  showDetails = userId => {
    this.setState({ userId, visibleModal: true });
  };

  hideDetails = () => {
    this.setState({ visibleModal: false });
  };

  // handleChangeTab = (key: string) => {
  //   const {
  //     history: { push }
  //   } = this.props;
  //   push(`/users?filter=${key}`);
  // };

  renderUserList = () => {
    const { users } = this.props;

    const usersList = get(users, 'data.data', []);

    if (users.fetching) return <Spin />;

    return (
      <div>
        <Table
          dataSource={usersList}
          columns={this.columns}
          rowKey="id"
          onChange={this.handlePaginate}
        />
      </div>
    );
  };

  render() {
    const { users } = this.props;

    const { visibleModal, userId } = this.state;

    return (
      <StyleWrapper>
        <Helmet title="Users" />

        <div>
          <Tabs>
            <Tabs.TabPane disabled={users.fetching} tab="Users List" key="list">
              {this.renderUserList()}
            </Tabs.TabPane>
            <Tabs.TabPane disabled={users.fetching} tab="Users Card" key="card">
              Test
            </Tabs.TabPane>
          </Tabs>
        </div>

        <Modal
          className="c--modal"
          title=""
          centered
          visible={visibleModal}
          onCancel={this.hideDetails}
          footer={null}
        >
          <UsersDetails user={userId} />
        </Modal>
      </StyleWrapper>
    );
  }
}

const mapStateToProps = ({ users }: Object) => ({ users });

const mapDispatchToProps = { loadAllUsers };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
