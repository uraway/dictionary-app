// @flow
import React, { Component } from "react";
import classnames from "classnames";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Container,
  Row,
  Col
} from "reactstrap";
import Search from "./Search";
import Options from "./Options";
import { alert, confirm } from "../utils";
import WordService from "../service/word";
import type { FileType } from "../utils/parser";

const wordService = new WordService();

type State = {
  activeTab: "Search" | "Options",
  isLoading: boolean
};

export default class App extends Component<{}, State> {
  state = { activeTab: "Search", isLoading: false };

  async componentDidMount() {
    /**
     * Get all words
     */
    const words = await wordService.getWords();
    if (words.length > 0) return;
    const isConfirmed = await confirm({
      title: "辞書データの登録",
      content: "辞書データが見つかりません。デフォルトの辞書を登録しますか？"
    });
    if (isConfirmed) {
      this.addWords();
    }
  }

  addWords = async (payload?: { fileType: FileType, blob: Blob }) => {
    try {
      /**
       * Load Starts
       */
      let wordCount = 0;
      this.setState({ isLoading: true, activeTab: "Options" });

      if (payload) {
        // Register from text file
        const rowsInserted = await wordService.addWordsFromFile(payload);
        wordCount = rowsInserted.length;
      } else {
        // Register from default dictionary
        const rowsInserted = await wordService.addDefaultWords();
        wordCount = rowsInserted.length;
      }

      alert({
        title: "登録完了",
        content: `${wordCount}語登録しました`
      });
      /**
       * Load Ends
       */
      this.setState({ isLoading: false });
    } catch (e) {
      alert({
        title: "エラー",
        content: e.message
      });
    }
  };

  toggle = (tab: "Search" | "Options") => {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  };

  render() {
    const { activeTab, isLoading } = this.state;
    return (
      <Container>
        <h1>Offline Dictionary</h1>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({
                active: activeTab === "Search"
              })}
              onClick={() => {
                this.toggle("Search");
              }}
            >
              Search
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
                active: activeTab === "Options"
              })}
              onClick={() => {
                this.toggle("Options");
              }}
            >
              Options
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="Search">
            <Row>
              <Col sm="12" md={{ size: 6, offset: 3 }}>
                <Search isLoading={isLoading} />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="Options">
            <Row>
              <Col sm="12" md={{ size: 6, offset: 3 }}>
                <Options isLoading={isLoading} addWords={this.addWords} />
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </Container>
    );
  }
}
