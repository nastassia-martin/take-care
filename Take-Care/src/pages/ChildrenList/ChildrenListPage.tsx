import { ColumnDef } from "@tanstack/react-table";
import Image from "react-bootstrap/Image";

import styles from "./styles.module.scss";
import useAuth from "../../hooks/useAuth";
import useGetTeacher from "../../hooks/useGetTeacher";
import UserListTable from "../../components/Tables/Table.tsx/Table";
import AccessDenied from "../../components/AccessDenied/AccessDenied";
import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import { ChildProfile } from "../../types/Profile.types";
import useGetChildrenForAdmin from "../../hooks/useGetChildrenForAdmin";
import EditKeyTeacherModal from "../../components/EditKeyTeacherModal";
import EditKeyTeacherForm from "../../components/Forms/EditKeyTeacher";
import useGetTeachers from "../../hooks/useGetTeachers";
import { FirebaseError } from "firebase/app";
import { KeyTeacher } from "../../types/Profile.types";

const ChildrenListPage = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const {
    currentUser,
    updateKeyTeacher,
    updateResponsibleForChildren,
    removeResponsibleForChild,
  } = useAuth();
  const [hasAdminAccess, setHasAdminAccess] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChildData, setSelectedChildData] =
    useState<ChildProfile | null>(null);

  const { data: teacher, loading: teacherLoading } = useGetTeacher(
    currentUser?.uid
  );
  const { data: children, loading: childrenLoading } = useGetChildrenForAdmin();
  const { data: teachers, loading: teachersLoading } = useGetTeachers();
  const isLoading = teacherLoading || childrenLoading || teachersLoading;

  const handleEdit = async (data: KeyTeacher) => {
    if (!selectedChildData) {
      setErrorMessage("No child selected!");
      return;
    }
    const previousTeacher = selectedChildData.keyTeacher;

    try {
      setLoading(true);
      const selectedTeacher = teachers?.find(
        (teacher) => teacher._id === data._id
      );
      if (selectedTeacher) {
        // KeyTeacher is the selected teacher
        const keyTeacherData: KeyTeacher = {
          _id: selectedTeacher._id,
          firstName: selectedTeacher.contact.firstName,
          lastName: selectedTeacher.contact.lastName,
        };

        const parentId = selectedChildData.parents
          .map((parent) => parent)
          .toString();

        await updateKeyTeacher(selectedChildData._id, keyTeacherData, parentId);
        await updateResponsibleForChildren(
          keyTeacherData._id,
          selectedChildData._id
        );
        // close modal on success
        setIsModalOpen(false);
      }

      if (
        previousTeacher &&
        previousTeacher._id !== (selectedTeacher && selectedTeacher._id)
      ) {
        const parentId = selectedChildData.parents
          .map((parent) => parent)
          .toString();
        // Remove child from the previous teacher's responsibilities
        await removeResponsibleForChild(
          previousTeacher,
          selectedChildData._id,
          parentId
        );
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Internal error");
      }
    } finally {
      setLoading(false);
    }
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
          header: "Key Teacher",
          accessorKey: "keyTeacher._id",
          cell: (cell) => {
            // find teacher in Teacher col, and make sure they are the same as the selected teacher
            const keyTeacherId = cell.row.original.keyTeacher?._id;
            const keyTeacher = teachers?.find(
              (teacher) => teacher._id === keyTeacherId
            );

            // If the child has been assigned a teacher give name, else display generic message
            const keyTeacherName = keyTeacher
              ? `${keyTeacher.contact.firstName} ${keyTeacher.contact.lastName}`
              : "No Teacher Assigned";

            // Finding the selected child in the Children col
            const selectedChild = children?.find(
              (child) => child._id === cell.row.original._id
            );

            // Handling the click event for the button
            const handleButtonClick = () => {
              if (selectedChild) {
                setSelectedChildData(selectedChild);
                setIsModalOpen(true);
              } else {
                console.error("Selected child not found");
              }
            };

            return (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {/* Display the status */}
                <div>{keyTeacherName} </div>

                {/* Button to edit or assign a teacher */}
                <Button
                  ariaLabel="Change key teacher"
                  onClick={handleButtonClick}
                >
                  {keyTeacherId ? "Edit Teacher" : "Assign Teacher"}
                </Button>
              </div>
            );
          },
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

  if (isLoading || loading) {
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
            {errorMessage && (
              <p className={styles.ErrorMessage}>{errorMessage}</p>
            )}
            {selectedChildData && (
              <EditKeyTeacherModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                data={selectedChildData}
              >
                {teacher && (
                  <EditKeyTeacherForm
                    loading={isLoading}
                    onEdit={handleEdit}
                    teachers={teachers}
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
