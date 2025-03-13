import AuthProvider from "./AuthProvider";
import ClassroomProvider from "./ClassroomProvider";
import CoursesProvider from "./CoursesProvider";
import DepartmentProvider from "./DepartmentProvider";
import TableProvider from "./TableProvider";
import TeachersProvider from "./TeachersProvider";

function CombinedProvider({ children }) {
  return (
    <TeachersProvider>
      <AuthProvider>
        <CoursesProvider>
          <DepartmentProvider>
            <ClassroomProvider>
              <TableProvider>{children}</TableProvider>
            </ClassroomProvider>
          </DepartmentProvider>
        </CoursesProvider>
      </AuthProvider>
    </TeachersProvider>
  );
}

export default CombinedProvider;
