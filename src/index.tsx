/**
 *  @format
 * @notice
 * render() は、そのクラスがXMLで呼ばれた際に呼び出される関数。
 *  JSXは、HTMLやJavaScriptの全てを使うことができる。
 *  → JavaScript の式も JSX 内で中括弧に囲んで記入することができます。
 *  propsは読み取り専用。stateの値も渡して良い。
 * state はカプセル化している。更新は、独立している
 * render は、変更点のみを更新する。
 */
import ReactDOM from 'react-dom/client';
import './index.css';
import Game from './game';

// ========================================
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(<Game />);
