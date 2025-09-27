import { 
  formClasses,
  inputContainerClasses,
  inputClasses,
  buttonClasses,
  h2Classes,
  labelClasses,
  checkLabelClasses,
  checkClasses} 
  from "../../styles/LoginClasses.js";

export default function LoginForm() {
  return(
    <form className={formClasses}>
      <h2 className={h2Classes}>SmartBooker</h2>
      <div className={inputContainerClasses}>
        <label htmlFor="email" className={labelClasses}>E-mail</label>
        <input
          id="email"
          type="email"
          value=""
          className={inputClasses}
          placeholder="example@gmail.com"
          required/>
      </div>
      <div className={inputContainerClasses}>
        <label htmlFor="password" className={labelClasses}>Password</label>
        <input
          id="password"
          type="password"
          value=""
          className={inputClasses}
          placeholder="........"
          required/>
      </div>
      <div className="flex items-start mb-5">
        <div className="flex items-center h-5">
          <input
            id="remember"
            type="checkbox"
            value=""
            className={checkClasses} 
            required />
        </div>
        <label htmlFor="remember" className={checkLabelClasses}>Remember me</label>
      </div>
      <button type="submit" className={buttonClasses}>Login</button>
    </form>
  );
}