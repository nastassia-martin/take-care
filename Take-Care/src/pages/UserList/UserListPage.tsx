import { ColumnDef } from "@tanstack/react-table";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";

import styles from "./styles.module.scss";
import useAuth from "../../hooks/useAuth";
import useGetTeacher from "../../hooks/useGetTeacher";
import useGetParentsForAdminList from "../../hooks/useGetParentsForAdminList";
import { ParentProfile } from "../../types/Profile.types";
import UserListTable from "../../components/Tables/Table.tsx/Table";
import AccessDenied from "../../components/AccessDenied/AccessDenied";
import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import { updateParentRole } from "../../helpers";
import { Role } from "../../types/GenericTypes.types";

const handleParentRoleClick = async (parentId: string, role: Role) => {
  const newRole = role === Role.NotApproved ? Role.User : Role.NotApproved;
  // if role is User, then isAuthorizedForPickUp is also true
  const isAuthorizedForPickUp = newRole === Role.User;

  try {
    await updateParentRole(parentId, newRole, isAuthorizedForPickUp);
  } catch (error: any) {
    <Alert variant="warning">{error.message}</Alert>;
  }
};

const columns: ColumnDef<ParentProfile>[] = [
  {
    header: "Parent Information",
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
        accessorKey: "role",
      },
      {
        header: "Change status",
        accessorKey: "_id",
        meta: {
          align: "center",
        },
        cell: (cell) => (
          <Button
            ariaLabel="change parent status"
            onClick={() =>
              handleParentRoleClick(
                cell.row.original._id,
                cell.row.original.role
              )
            }
          >
            Change status
          </Button>
        ),
      },
    ],
  },
  {
    header: "Child information",
    columns: [
      {
        header: "First name",
        accessorKey: "childrenContact.firstName",
      },
      {
        header: "Last name",
        accessorKey: "childrenContact.lastName",
      },
    ],
  },
];

const UserListPage = () => {
  const { currentUser } = useAuth();
  const [hasAdminAccess, setHasAdminAccess] = useState(false);

  const { data: teacher, loading: teacherLoading } = useGetTeacher(
    currentUser?.uid
  );
  const { data: parents, loading: parentsLoading } =
    useGetParentsForAdminList();

  const isLoading = teacherLoading || parentsLoading;

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
              Hey {teacher?.contact.firstName}, here's a list of all parent
              users
            </h3>
            {parents && <UserListTable data={parents} columns={columns} />}
          </>
        )}
        {!hasAdminAccess && currentUser && (
          <AccessDenied email={currentUser.email!} />
        )}
      </section>
    </main>
  );
};
export default UserListPage;
