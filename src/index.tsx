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

/** State で表示する文字列や空白を定義 */
type SquareState = {
    value: string | null;
};

/** 渡される数字を定義 */
type SquareProps = {
    value: number;
    onClick: () => void
};

/**
 * 単一のマスの表示を担うコンポーネントです。空白・O・Xの3つの状態を取ります。
 *  → コンポーネントは props （プロパティ）を経由して、パラメータを受け取る。
 *
 * ⭐props を渡す
 * React.Component に 型をジェネリクスとして指定する。
 *      → React.Componentは、props を実装しているため、型を指定したクラスを渡す。
 * React.Component<Props,State>は「React.Componentの引数にはProps型とState型が利用可能」
 */
class Square extends React.Component<SquareProps, SquareState> {
    // Propsの引数
    constructor(props: SquareProps) {
        // 全ての親クラスのコンストラクタ継承する必要がある。
        super(props);
        // State の定義にあった宣言。コンポーネント内で、This.state を持つことで
        // 状態を持つことができる。（DOM操作 → value で、値を取得して上書きできる。）
        //  → この場合のState は、プライベート関数になる。 → set、get で取得。
        this.state = {
            value: null,
        };
    }
    render() {
        return (
            <button
                className='square'
                // プライベート関数に値をいれる。
                onClick={() => {
                    // セッターを呼び出すと再レンダリングされる。
                    this.setState({ value: 'X' });
                }}
            >
                {/* 文字を表示する欄 */}
                {/* {this.props.value} */}
                {/*  Getter を呼びだす。 */}
                {this.state.value}
            </button>
        );
    }
}

/**
 * 3x3の9つのマスの表示を担うコンポーネントです。
 * propsから受け取る配列の情報をもとに、9つのSquareたちに盤面の状態を表示させます。
 */
class Board extends React.Component {
    constructor(props: SquareProps) {
        super(props);
        this.state = {
            // 9個の空白を用意しておく
            squares: Array(9).fill(null),
        };
    }
    /**Square に、Props を渡す */
    renderSquare(i: number) {
        // 配列のI 番目を渡す。
        return <Square value={this.state.squares[i]
            // 型定義にもonClick を追加する。
            onClick={() => this.handleClick(i)}
        } />;
    }

    render() {
        const status = 'Next player: X';

        return (
            <div>
                <div className='status'>{status}</div>
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

/**
 * ゲーム全体の進行を制御するコンポーネントです。
 * 「盤面の状態」はこのコンポーネントが管理します。
 * また、操作に応じて過去の手番への巻き戻しも行います。
 */
class Game extends React.Component {
    render() {
        return (
            <div className='game'>
                <div className='game-board'>
                    <Board />
                </div>
                <div className='game-info'>
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(<Game />);
