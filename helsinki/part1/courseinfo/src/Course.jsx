import { Part } from "./Part"; 

//header
const Header = (props) => {
  return (
    <h2 className="text-3xl font-bold text-indigo-800 mb-4 pb-2 border-b-2 border-indigo-100">
        {props.course.name}
    </h2>
  );
};
// --- 2. Define Content locally ---
const Content = (props) => {
  return (
    <div className="space-y-2 mb-4">
     {props.parts.map((part) => ( 
        <Part 
          key={part.id} 
          part={part.name} 
          exercise={part.exercises} 
        />
     ))}
    </div>
  );
};
// --- 3. Define Total locally ---
const Total = (props) => {
  const parts = props.parts;
  const total = parts.reduce((sum, part)=> sum + part.exercises, 0)
    
  return (
      <h3 className="text-lg font-bold text-green-700 mt-4 pt-3 border-t border-gray-200">
          total of {total} exercises
      </h3>
  );
};
// --- 4. Main Exported Component: Course ---
export const Course =({courses})=>{
    
  return (
    // The main Course component uses the local components defined above
    <>
      {courses.map(course => (
          <div key={course.id} className="mb-8 p-6 bg-white shadow-xl rounded-lg border border-indigo-100">
              <Header course={course} />
              <Content parts={course.parts} />
              <Total parts={course.parts} />
          </div>
      ))}
    </>
  )
}
