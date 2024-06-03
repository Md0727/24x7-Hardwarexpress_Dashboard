import { image } from "../../constent/image"
import TemplatePointers from "./components/TemplatePointers"



function LandingIntro() {

  return (
    <div className="hero min-h-full rounded-l-xl bg-base-200">
      <div className="hero-content py-12">
        <div className="max-w-md">
          <div className="text-center mt-12"><img src={image?.logo} alt="Dashwind Admin Template" className="w-48 inline-block"></img></div>

          {/* Importing pointers component */}
          <div className="text-center w-56">
            <h1 className="text-2xl mt-8 font-bold">New Here?</h1>
            <p>Sign up and discover a great amount of new opportunities!</p>
          </div>
        </div>

      </div>
    </div>
  )

}

export default LandingIntro