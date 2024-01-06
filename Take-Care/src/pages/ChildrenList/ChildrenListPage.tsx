import { ColumnDef } from "@tanstack/react-table";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";

import styles from "./styles.module.scss";
import useAuth from "../../hooks/useAuth";
import useGetTeacher from "../../hooks/useGetTeacher";
import UserListTable from "../../components/Tables/Table.tsx/Table";
import AccessDenied from "../../components/AccessDenied/AccessDenied";
import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import { ChildProfile } from "../../types/CreateProfile.types";
import useGetChildrenForAdmin from "../../hooks/useGetChildrenForAdmin";
import EditKeyTeacherModal from "../../components/EditKeyTeacherModal";
import EditKeyTeacherForm from "../../components/Forms/EditKeyTeacher";

const ChildrenListPage = () => {
  const { currentUser } = useAuth();
  const [hasAdminAccess, setHasAdminAccess] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChildData, setSelectedChildData] =
    useState<ChildProfile | null>(null);

  const { data: teacher, loading: teacherLoading } = useGetTeacher(
    currentUser?.uid
  );
  const { data: children, loading: childrenLoading } = useGetChildrenForAdmin();

  const isLoading = teacherLoading || childrenLoading;

  const handleSignUp = async (data) => {
    console.log(data);
  };
  const columns: ColumnDef<ChildProfile>[] = [
    {
      header: "Child Information",
      columns: [
        {
          header: "Profile pic",
          accessorKey: "contact.photoURL",
          cell: ({ row }) => {
            return (
              <div className="flex items-center">
                <Image
                  className="rounded-circle rounded mx-auto d-block"
                  src={row.original.contact.photoURL}
                  alt={`${row.original.contact.firstName} ${row.original.contact.lastName}`}
                  width={40}
                />
              </div>
            );
          },
        },
        {
          header: "First name",
          accessorKey: "contact.firstName",
        },
        {
          header: "Last name",
          accessorKey: "contact.lastName",
        },
        {
          header: "Status",
          accessorKey: "keyTeacher._id",
          cell: (teacher) => {
            // If cell's value is undefined, or null,  will return a default value
            return teacher.getValue()
              ? teacher.getValue()
              : "No teacher assigned";
          },
        },
        {
          header: "Add key teacher",
          accessorKey: "_id",
          meta: {
            align: "center",
          },
          cell: (cell) => (
            <Button
              ariaLabel="change parent status"
              onClick={() => {
                const selectedChild = children?.find(
                  (child) => child._id === cell.row.original._id
                );
                if (selectedChild) {
                  setSelectedChildData(selectedChild); // Set the selected child data
                  setIsModalOpen(true); // Open the modal
                } else {
                  console.error("Selected child not found"); // Handle the case where child is not found
                }
              }}
            >
              Edit key teacher
            </Button>
          ),
        },
      ],
    },
  ];
  useEffect(() => {
    // When teacher data is fetched, check if the role is 'admin'
    if (teacher) {
      teacher?.role === "Admin"
        ? setHasAdminAccess(true)
        : setHasAdminAccess(false);
    }
  }, [teacher]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    return <div>You don't have a profile.</div>;
  }

  return (
    <main className={styles.PageWrapper}>
      <section>
        {hasAdminAccess && (
          <>
            <h3 className={styles.Title}>
              Hey {teacher?.contact.firstName}, here's a list of all children
            </h3>
            {selectedChildData && (
              <EditKeyTeacherModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                data={selectedChildData}
              >
                {teacher && (
                  <EditKeyTeacherForm
                    loading={isLoading}
                    onSignup={handleSignUp}
                  />
                )}
              </EditKeyTeacherModal>
            )}

            {children && <UserListTable data={children} columns={columns} />}
          </>
        )}
        {!hasAdminAccess && currentUser && (
          <AccessDenied text={currentUser.email!} />
        )}
      </section>
    </main>
  );
};

export default ChildrenListPage;
