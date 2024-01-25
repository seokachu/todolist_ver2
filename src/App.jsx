import './components/styles/style.css';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import TodoController from './components/todo/TodoController';

function App() {
    return (
        <>
            <Header />
            <TodoController />
            <Footer />
        </>
    );
}

export default App;
