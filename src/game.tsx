/** @format */
import React from 'react';
import Clock from './clock';
import Board from './board';
import calculateWinner from './calculateWinner';

export type SquareType = 'O' | 'X' | null;

type HistoryData = {
    squares: Array<SquareType>;
};

type GameState = {
    history: HistoryData[];
    xIsNext: boolean;
    stepNumber: number;
};

/**
 * ゲーム全体の進行を制御するコンポーネントです。
 * 「盤面の状態」はこのコンポーネントが管理します。
 * また、操作に応じて過去の手番への巻き戻しも行います。
 */
class Game extends React.Component<{}, GameState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            history: [
                {
                    squares: Array(9).fill(null),
                },
            ],
            xIsNext: true,
            stepNumber: 0,
        };
    }

    /**
     *クリックイベントで、文字列を配列に格納してレンダリング、同期する
        イベントのメソッドの記述には、handle 頭文字につけるのが慣習。キャメルケースで書く。
        e.preventDefault(); のように、サブミットで送る場合のボタンキャンセルは明示する。
     * @param i 配列から文字列を取りだすインデックス
     */
    handleClick(i: number) {
        // Stateの配列のコピーを作成 → スライスを使って、移動した履歴以降の配列を削除する
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[this.state.stepNumber];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        // ユーザーのマークを格納
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            // State にコピー設定して、上書きする。 → 変更完了
            //  → イミュータブルにした方が拡張性が高くなる。
            history: history.concat([
                {
                    squares: squares,
                },
            ]),
            // History の長さで上書き
            stepNumber: history.length,
            // 真偽値を反転させて上書き
            xIsNext: !this.state.xIsNext,
        });
    }

    /**
     *  履歴にジャンプして、配列の値を上書きする
     * @param move 履歴のインデックス
     */
    jumpTo(step: number) {
        this.setState({
            stepNumber: step,
            // 更新しようとしている stepNumber の値が偶数だった場合は xIsNext を true に設定
            xIsNext: step % 2 === 0,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[history.length - 1];
        const winner = calculateWinner(current.squares);
        // step が history 内の現在の要素を参照し、move が現在の要素のインデックスを参照
        const moves = history.map((step, move) => {
            // Move があるかどうか。
            const desc = move ? 'Go to move #' + move : 'Go to game start';
            return (
                // 履歴は、その配列１つ１つが、一意なキーを持つ -> move: number 部分
                // これで警告がでなくなる。
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });
        let status;
        if (winner) {
            // is not null ?
            status = 'winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div>
                <div className='clock'>
                    <Clock />
                </div>
                <div className='game'>
                    <div className='game-board'>
                        <Board
                            squares={current.squares}
                            onClick={(i: number) => this.handleClick(i)}
                        />
                    </div>
                    <div className='game-info'>
                        <div>{status}</div>
                        <ol>{moves}</ol>
                    </div>
                </div>
            </div>
        );
    }
}

export default Game;
