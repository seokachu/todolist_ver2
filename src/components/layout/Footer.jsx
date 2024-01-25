import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareGithub, faBlogger } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
    return (
        <footer>
            <address>
                <p>&copy;2024&#46;SeoyoungPark</p>
                <div className="footer-link">
                    <p>
                        <a
                            href="https://github.com/seokachu/todoList-develop"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <FontAwesomeIcon icon={faSquareGithub} />
                        </a>
                    </p>
                    <p>
                        <a
                            href="https://seokachu.tistory.com/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <FontAwesomeIcon icon={faBlogger} />
                        </a>
                    </p>
                </div>
            </address>
        </footer>
    );
}
