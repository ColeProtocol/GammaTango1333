import React from "react";
import { View, StyleSheet } from "react-native";
import Comment from "./Comment";

const Thread = ({ comments, post }) => {

  const renderParents = (entries) => {
    const parents = [];
    for (const postId in entries) {
      parents.push(
        <Comment
          //key={postId}
          //comment={entries[postId].content}
          //children={entries[postId].children}
          post={post}
          username={comments.username}
          title={comments.title}
          content={comments.content}
          date={comments.created_at}
        />
      )
    }

    return parents
  }

  return (
    <View style={styles.container}>
      {renderParents(comments)}
    </View>
  )
}

export default Thread;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 20
  }
});
