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
// $FlowIgnore
import { ReactComponent as SpinnerSVG } from "../Spinner.svg";
import "./App.css";

const wordService = new WordService();

type State = {
  activeTab: "Search" | "Options",
  isBusy: boolean
};

export default class App extends Component<{}, State> {
  state = { activeTab: "Search", isBusy: false };

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
      this.handleAddWords();
    }
  }

  handleAddWords = (payload?: { fileType: FileType, blob: Blob }) => {
    this.setState(
      {
        isBusy: true
      },
      async () => {
        let wordCount;
        if (payload) {
          // Register from text file
          const insertedRows = await wordService.addWordsFromFile(payload);
          wordCount = insertedRows.length;
        } else {
          // Register from default dictionary
          const insertedRows = await wordService.addDefaultWords();
          wordCount = insertedRows.length;
        }

        this.setState({
          isBusy: false
        });
        alert({
          title: "辞書データの登録",
          content: `${wordCount}語登録しました`
        });
      }
    );
  };

  handleClearWords = async () => {
    const isConfirmed = await confirm({
      title: "辞書データの削除",
      content: "登録した辞書データをすべて削除します。よろしいですか？"
    });

    if (!isConfirmed) return;

    this.setState({
      isBusy: true
    });

    try {
      await wordService.clear();
    } catch (e) {
      alert({
        title: "エラー",
        content: e.message
      });
    }
    alert({
      title: "辞書データの削除",
      content: "辞書データをすべて削除しました"
    });
    this.setState({
      isBusy: false
    });
  };

  toggle = (tab: "Search" | "Options") => {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  };

  render() {
    const { activeTab, isBusy } = this.state;
    return (
      <Container>
        <div className="title-container">
          <h1>Offline Dictionary</h1>
          {isBusy && <SpinnerSVG id="spinner" />}
        </div>
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
                <Search isBusy={isBusy} />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="Options">
            <Row>
              <Col sm="12" md={{ size: 6, offset: 3 }}>
                <Options
                  addWords={this.handleAddWords}
                  clearWords={this.handleClearWords}
                  isBusy={isBusy}
                />
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </Container>
    );
  }
}
