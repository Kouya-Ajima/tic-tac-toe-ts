/** @format */
import React from 'react';
import Square from './square';
import { SquareType } from './game';

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

export default Board;
