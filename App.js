import * as React from "react";
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from "react-native";

export default class App extends React.Component {
  constructor () {
    super();
    this.state = {
      text: "",
      searchPressed: false,
      word: "",
      lexicalCategory: "",
      examples: [],
      definition: "",
    };
  }

  search() {
    return (
      <View style={{ alignContent: "center" }}>
        <TouchableOpacity style={styles.wordOpacity}>
          <Text style={styles.word}>Word</Text>
          <Text style={styles.word2}>{this.state.word}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.wordOpacity}>
          <Text style={styles.word}>Type</Text>
          <Text style={styles.word2}>{this.state.lexicalCategory}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.wordOpacity}>
          <Text style={styles.word}>Definition</Text>
          <Text style={styles.word2}>{this.state.definition}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  getWord(word) {
    var searchKeyword = word.toLowerCase();
    var url =
      "https://rupinwhitehatjr.github.io/dictionary/" + searchKeyword + ".json";

    return fetch(url)
      .then((data) => {
        if (data.status === 200) {
          return data.json();
        } else {
          return null;
        }
      })
      .then((response) => {
        var responseObj = response;

        if (responseObj) {
          var wordData = responseObj.definitions[0];
          var definition = wordData.description;
          var lexicalCategory = wordData.wordtype;

          this.setState({
            word: this.state.text,
            lexicalCategory: lexicalCategory,
            definition: definition,
          });
        } else {
          this.setState({
            word: this.state.text,
            definition: "Not Found",
          });
        }
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputBoxContainer}>
          <TextInput
            styles={styles.inputBox}
            onChangeText={(text) => {
              this.setState({
                text: text,
                searchPressed: false,
                word: "Press Search",
                lexicalCategory: "",
                examples: [],
                definition: "",
              });
            }}
            placeholder={"Enter Word Here"}
            value={this.state.text}
          ></TextInput>
        </View>

        <TouchableOpacity
          onPress={() => {
            this.setState({ searchPressed: true });
            this.getWord(this.state.text);
          }}
        >
          <Text style={styles.searchBtn}>Search</Text>
        </TouchableOpacity>

        <View>
          <Text>
            {this.state.searchPressed == true &&
              this.state.word == "Press Search"
              ? ""
              : this.search()}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputBoxContainer: {
    marginTop: 200,
    alignSelf: "center",
    textAlign: "center",
  },
  inputBox: {
    alignSelf: "center",
    textAlign: "center",
    alignItems: "center",
  },
  searchBtn: {
    alignSelf: "center",
    fontSize: 25,
    fontWeight: "bold",
  }, 
  wordOpacity: {
    backgroundColor: "black",
    marginTop: 3,
    borderRadius: 5,
  },
  word: {
    fontSize: 15,
    color: "white",
    display: "flex",
  },
  word2: {
    color: "white",
    display: "flex",
  },
});
