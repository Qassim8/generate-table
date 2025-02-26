import ClassroomProvider from "./ClassroomProvider";
import CoursesProvider from "./CoursesProvider";
import DepartmentProvider from "./DepartmentProvider";
import TableProvider from "./TableProvider";
import TeachersProvider from "./TeachersProvider";

function CombinedProvider({ children }) {
  return (
    <TeachersProvider>
      <CoursesProvider>
        <DepartmentProvider>
          <ClassroomProvider>
            <TableProvider>{children}</TableProvider>
          </ClassroomProvider>
        </DepartmentProvider>
      </CoursesProvider>
    </TeachersProvider>
  );
}

export default CombinedProvider;
