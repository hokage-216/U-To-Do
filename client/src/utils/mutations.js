import { gql } from '@apollo/client';

export const ADD_PROFILE = gql`
  mutation addProfile($name: String!, $email: String!, $password: String!) {
    addProfile(name: $name, email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const ADD_TODO = gql`
  mutation addTodo($profileId: ID!, $todo: String!) {
    addTodo(profileId: $profileId, todo: $todo) {
      _id
      name
      todo
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const REMOVE_TODO = gql`
  mutation removeTodo($todoId: ID!) {
    removeTodo(todoId: $todoId) {
      _id
      name
      todo
    }
  }
`;

