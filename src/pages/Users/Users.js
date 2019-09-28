/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { get } from 'lodash';
import { Avatar, Table, Button, Spin, Modal, Icon } from 'antd';

import { loadAll as loadAllUsers } from 'actions/users.action';
import { UsersCard, UsersDetails } from 'components';
import StyleWrapper from './users.style';

type Props = {
  history: Object,
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
      dataIndex: 'avatar',
      render: (avatar: string) => (
        <div>
          <Avatar size={64} src={avatar} />
        </div>
      )
    },
    {
      title: 'First Name',
      dataIndex: 'first_name'
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name'
    },
    {
      title: 'Email',
      dataIndex: 'email'
    },
    {
      title: '',
      dataIndex: 'id',
      className: 'text-right',
      render: (_, row: Object) => (
        <Button
          size="large"
          type="primary"
          shape="round"
          onClick={() => this.showDetailsModal(row)}
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

  showDetailsModal = userId => {
    this.setState({ userId, visibleModal: true });
  };

  hideDetailsModal = () => {
    this.setState({ visibleModal: false });
  };

  hendleRedirect = () => {
    const { history } = this.props;
    history.push('/users/new-user');
  };

  showDetailsPage = (id: Object) => {
    const { history } = this.props;
    history.push(`/users/${id}`);
  };

  renderUserList = () => {
    const { users } = this.props;
    const usersList = get(users, 'data.data', []);

    if (users.fetching === null || users.fetching) return <Spin />;

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

    const usersList = get(users, 'data.data', []);

    return (
      <StyleWrapper>
        <Helmet title="Users" />

        <div className="add-user">
          <Button
            size="large"
            type="primary"
            shape="round"
            icon="user-add"
            onClick={this.hendleRedirect}
          >
            Add new user
          </Button>
        </div>

        <div>{this.renderUserList()}</div>

        <UsersCard user={usersList} onClick={this.showDetailsPage} />

        <Modal
          className="c--modal"
          title=""
          centered
          visible={visibleModal}
          onCancel={this.hideDetailsModal}
          footer={null}
        >
          <UsersDetails user={userId} />
        </Modal>
      </StyleWrapper>
    );
  }
}

const mapStateToProps = ({ users }: Object) => ({ users: users.all });

const mapDispatchToProps = { loadAllUsers };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
