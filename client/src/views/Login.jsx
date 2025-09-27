import LoginForm from "../components/Login/LoginForm"
import { FaCheckCircle, FaClock, FaBell} from "react-icons/fa"
import {
  loginContainerClasses,
  formContainerClasses,
  introContainerClasses,
  textContainerClasses,
  heroClasses,
  introTextClasses,
  blockqouteClass,
  ulClasses,
  liClasses,
  iconClasses
} from "../styles/LoginClasses"

export default function Login() {
  return (
    <div className={loginContainerClasses}>
      <div className={formContainerClasses}>
        <LoginForm/>
      </div>
      <div className={introContainerClasses}>
        <div className={textContainerClasses}>
          <h1 className={heroClasses}>Welcome back!</h1>
          <p className={introTextClasses}>
            Book your appointments effortlessly and manage your schedule in one place.
          </p>
          <blockquote className={blockqouteClass}>
            “Save time. Stay organized. Delight your clients.”
          </blockquote>
          <ul className={ulClasses}>
            <li className={liClasses}>
              <FaCheckCircle className={iconClasses}/>
              <span>Quick and easy booking</span>
            </li>
            <li className={liClasses}>
              <FaClock className={iconClasses}/>
              <span>Real-time scheduling</span>
            </li>
            <li className={liClasses}>
              <FaBell className={iconClasses}/>
              <span>Automatic reminders</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}