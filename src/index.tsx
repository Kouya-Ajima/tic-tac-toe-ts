/**
 *  @format
 * @notice
 * render() は、そのクラスがXMLで呼ばれた際に呼び出される関数。
 *  JSXは、HTMLやJavaScriptの全てを使うことができる。
 *  → JavaScript の式も JSX 内で中括弧に囲んで記入することができます。
 *
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

/** 渡される数字を定義 */
type SquareProps = {
    value: string | null;
    onClick: () => void;
};

/**
 * 単一のマスの表示を担うコンポーネントです。空白・O・Xの3つの状態を取ります。
 *  → コンポーネントは props （プロパティ）を経由して、パラメータを受け取る。
 *
 * ⭐props を渡す
 * React.Component に 型をジェネリクスとして指定する。
 *      → React.Componentは、props を実装しているため、型を指定したクラスを渡す。
 * React.Component<Props,State>は「React.Componentの引数にはProps型とState型が利用可能」
 *
 * → Square を関数コンポーネントに書き換え
 *   → render メソッドだけを有して自分の state を持たないコンポーネントを、よりシンプルに書く
 * returnは不要です。<button>~</button>がひとまとまりの返り値、JSX要素とみなされる
 */
function Square(props: SquareProps) {
    return (
        // Square が Board の state を更新できるようにする必要があります。
        // call this.handleClick(i)
        <button className='square' onClick={props.onClick}>
            {/* 文字を表示する欄 */}
            {props.value}
        </button>
    );
}

type SquareType = 'O' | 'X' | null;

/** State で表示する文字列や空白を定義 */
type BoardProps = {
    squares: Array<SquareType>;
    onClick: (i: number) => void;
};

/**
 * 3x3の9つのマスの表示を担うコンポーネントです。
 * propsから受け取る配列の情報をもとに、9つのSquareたちに盤面の状態を表示させます。
 * state を親コンポーネントにリフトアップ (lift up) する
 *  → Square コンポーネントは制御されたコンポーネント (controlled component) になった
 */
class Board extends React.Component<BoardProps> {
    /**Square に、Props を渡す */
    renderSquare(i: number) {
        // 配列のI 番目を渡す。
        return (
            // Props を渡す
            <Square
                // 表示する文字列が格納された配列を渡す。 → 変更があると自動的に再レンダーされる。
                value={this.props.squares[i]} // 配列の 2番めの X など。
                // 型定義にもonClick を追加する。
                // onClick プロパティはマス目がクリックされた時に Square が呼び出すためのもの
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        return (
            <div>
                {/* <div className='status'>{status}</div> */}
                <div className='board-row'>
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className='board-row'>
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className='board-row'>
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

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
        );
    }
}

function calculateWinner(squares: Array<SquareType>) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]
        ) {
            return squares[a];
        }
    }
    return null;
}

// ========================================

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(<Game />);
