import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import React, { ReactNode } from "react";
import { FaSort, FaSortAmountDownAlt, FaSortAmountUp } from "react-icons/fa";

const CreateAtSort = ({
  handleSort,
  name = "Create",
  icon,
}: {
  handleSort: any;
  name: string;
  icon?: ReactNode;
}) => {
  return (
    <div>
      <div>
        <Dropdown>
          <DropdownTrigger>
            <Button className="flex justify-center items-center gap-3 border border-white light:border-black">
              {icon}
              {name}
            </Button>
          </DropdownTrigger>
          {/* Set placement to 'bottomLeft' to open the dropdown to the left */}
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem key="new">
              <button
                onClick={handleSort}
                className="flex justify-center items-center gap-4 w-full"
              >
                <FaSortAmountUp />
                ASC
              </button>
            </DropdownItem>

            <DropdownItem>
              <button
                onClick={handleSort}
                className="flex justify-center items-center gap-4 w-full"
              >
                <FaSortAmountDownAlt />
                DESC
              </button>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
};

export default CreateAtSort;
