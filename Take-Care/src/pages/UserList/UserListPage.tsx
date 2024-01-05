import { ColumnDef } from "@tanstack/react-table";
import Image from "react-bootstrap/Image";
import styles from "./styles.module.scss";
import useAuth from "../../hooks/useAuth";
import useGetTeacher from "../../hooks/useGetTeacher";
import useGetParentsForAdminList from "../../hooks/useGetParentsForAdminList";
import { ParentProfile } from "../../types/CreateProfile.types";
import UserListTable from "../../components/Tables/Table.tsx/Table";
import AccessDenied from "../../components/AccessDenied/AccessDenied";
import { useEffect, useState } from "react";

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

  if (!currentUser) {
    return <div>You don't have a profile.</div>;
  }

  const { data: teacher } = useGetTeacher(currentUser.uid);
  const { data: parents } = useGetParentsForAdminList();

  useEffect(() => {
    if (!teacher) {
      return;
    }
    // When teacher data is fetched, check if the role is 'admin'
    teacher.role === "Admin"
      ? setHasAdminAccess(true)
      : setHasAdminAccess(false);
  }, [teacher]);
  return (
    <>
      <main className={styles.PageWrapper}>
        <section>
          {hasAdminAccess && (
            <>
              <h3>
                Hey {teacher?.contact.firstName}, here's a list of all parent
                users
              </h3>
              {parents && <UserListTable data={parents} columns={columns} />}
            </>
          )}
          {!hasAdminAccess && currentUser && (
            <AccessDenied text={currentUser.email!} />
          )}
        </section>
      </main>
    </>
  );
};
export default UserListPage;
