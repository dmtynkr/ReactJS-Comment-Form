"use strict";

var App = React.createClass({
  displayName: "App",

  getInitialState: function getInitialState() {
    return {
      comments: {}
    };
  },

  addComment: function addComment(commentData) {

    (function (foo, bar) {});

    var timeStamp = new Date().getTime();

    this.state.comments['comment-id' + timeStamp] = commentData;
    this.setState({
      comments: this.state.comments
    });
  },

  renderComment: function renderComment(key) {
    return React.createElement(
      "li",
      { className: "" },
      React.createElement(NewComment, { key: key, index: key, details: this.state.comments[key] })
    );
  },

  render: function render() {
    return React.createElement(
      "div",
      { className: "row medium-8 large-7 columns" },
      React.createElement(
        "ol",
        { className: "comment-list block-comments" },
        Object.keys(this.state.comments)
        // Creating a NEW array
        .map(this.renderComment)
      ),
      React.createElement(AddCommentForm, { addComment: this.addComment }),
      React.createElement(
        "pre",
        null,
        JSON.stringify(this.state, null, 2)
      )
    );
  }
});

/*
  Add comment Form
  <AddCommentForm />
*/
// Semi-Dumb
var AddCommentForm = React.createClass({
  displayName: "AddCommentForm",

  processComment: function processComment(event) {
    event.preventDefault();

    // 1. Take data from from form
    var commentData = {
      commentName: this.refs.name.value,
      commentBody: this.refs.desc.value
    };

    // 2. Pass data back to App
    this.props.addComment(commentData);

    // 3. Reset the form
    this.refs.commentForm.reset();
  },

  render: function render() {
    return React.createElement(
      "div",
      { className: "callout secondary" },
      React.createElement(
        "h4",
        { className: "leave-comment" },
        "Add a Comment"
      ),
      React.createElement(
        "form",
        { className: "post-edit", ref: "commentForm", onSubmit: this.processComment },
        React.createElement("input", { type: "text", ref: "name", placeholder: "Your Name", required: true }),
        React.createElement("textarea", { ref: "desc", placeholder: "Add your comment here", required: true }),
        React.createElement(
          "button",
          { id: "submit", type: "submit", className: "button button-outline comment-button action-button expand-right" },
          "Add Comment"
        )
      )
    );
  }
});

/*
  Newcomment
  <NewComment />
*/
var NewComment = React.createClass({
  displayName: "NewComment",

  render: function render() {
    return React.createElement(
      "div",
      { className: "block-comment-content module text" },
      React.createElement(
        "div",
        { className: "comment-user" },
        React.createElement(
          "div",
          { className: "comment-user-avatar-wrap" },
          React.createElement(
            "a",
            null,
            React.createElement("img", { src: "//www.linkedin.com/mpr/mpr/AAEAAQAAAAAAAAVbAAAAJGJkNjEwNGU2LWMzZDAtNGJlMi05MzNhLWRkYzc0NTMyMGU2YQ.jpg", className: "comment-avatar", alt: "" })
          )
        ),
        React.createElement(
          "div",
          { className: "comment-user-text" },
          React.createElement(
            "a",
            { href: "#0", "data-username": "cathbailh", className: "comment-username" },
            React.createElement(
              "span",
              { className: "username" },
              this.props.details.commentName
            )
          ),
          React.createElement(
            "span",
            { className: "on" },
            " on "
          ),
          React.createElement(
            "a",
            { href: "#0" },
            React.createElement(
              "time",
              { className: "block-comment-time" },
              h.getTime()
            )
          )
        )
      ),
      React.createElement(
        "div",
        { className: "comment-text" },
        React.createElement(
          "p",
          null,
          this.props.details.commentBody
        )
      )
    );
  }
});

React.render(React.createElement(App, null), document.querySelector("#main"));