/**
 * 渡される数字を定義
 *
 * @format
 */

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

export default Square;
