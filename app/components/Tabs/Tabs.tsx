import { ColorsV3 } from "@cecoc/ui-kit-v3";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ComponentProps,
  type ReactNode,
} from "react";
import styles from "./Tabs.module.css";

interface TabsContextProps<T> {
  onTabChange: (arg: T) => void;
  selected: T | null;
}

const TabsContext = createContext<TabsContextProps<any> | null>(null);

function useTabs<T>() {
  const context = useContext(TabsContext) as TabsContextProps<T> | null;
  if (!context) throw new Error("useTabs must be used inside a TabsProvider");
  return context;
}
interface TabsProviderProps<T> extends TabsContextProps<T> {
  children: ReactNode;
}
export function TabsProvider<T>({
  selected,
  onTabChange,
  children,
}: TabsProviderProps<T>) {
  return (
    <TabsContext.Provider value={{ selected, onTabChange }}>
      {children}
    </TabsContext.Provider>
  );
}

export interface TabsProps<T>
  extends TabsContextProps<T>,
    ComponentProps<"div"> {
  options: TabOptions<T>;
}

export function Tabs<T extends string>({
  onTabChange,
  selected,
  options,
  ...props
}: TabsProps<T>) {
  return (
    <TabsProvider onTabChange={onTabChange} selected={selected}>
      <div style={{ display: "flex" }} {...props}>
        <Tabs.Items options={options} />
      </div>
    </TabsProvider>
  );
}

interface TagItemProps<T> extends Omit<ComponentProps<"button">, "value"> {
  value: T;
}

Tabs.Items = function TabItem<T extends string>({
  options,
}: {
  options: TabOptions<T>;
}) {
  return options.map((option) => (
    <Tabs.Item
      key={isTabOption(option) ? option.value : option}
      value={isTabOption(option) ? option.value : option}
      disabled={isTabOption(option) ? option.disabled : false}
    >
      {isTabOption(option) ? option.label : option}
    </Tabs.Item>
  ));
};

Tabs.Item = function TabItem<T>({
  value,
  children,
  ...props
}: TagItemProps<T>) {
  const { selected, onTabChange } = useTabs<T>();

  return (
    <>
      <button
        role="tab"
        data-state={selected === value ? "active" : "inactive"}
        className={styles.tab}
        onClick={() => onTabChange(value)}
        {...props}
      >
        {children}
        {selected === value && (
          <span
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "2px",
              backgroundColor: ColorsV3.mainColor.primary,
            }}
          />
        )}
      </button>
    </>
  );
};

export interface TabOption<T> {
  value: T;
  label: string;
  disabled?: boolean;
}

type ExtractValue<T> = T extends TabOption<infer U> ? U : T;
type TabOptions<T> = readonly T[] | readonly TabOption<T>[];

function getCurrentTab<T>(
  options: TabOptions<T>,
  selected: ExtractValue<T> | null,
  defaultSelected?: boolean
): ExtractValue<T> | null {
  if (options.length === 0) return null;
  if (isTabOptionArray(options)) {
    if (options.find((a) => a.value === selected && !a.disabled)) {
      return selected as ExtractValue<T>;
    } else
      return (defaultSelected as ExtractValue<T>)
        ? (options.find((o) => !o.disabled)?.value as ExtractValue<T>) || null
        : null;
  } else {
    if (options.find((a) => a === selected)) {
      return selected as ExtractValue<T>;
    } else return defaultSelected ? (options[0] as ExtractValue<T>) : null;
  }
}

interface Config {
  /**
   * When using this option the selected tab will be stored as a query param in the url. For example setting queryKey=page will end up in www.mypage.com?page=[value].
   * If options is not provided the value of the selection will be stored as a React state.
   */
  queryKey?: string;
  /**
   * By default is set to true. When is set to true it will select the first tab not disabled on page rendered. If all options are disabled no tab will be selected. If option is
   * set to false no option will be selected by default.
   */
  defaultSelected?: boolean;
  /**
   * Scroll will move the scroll of the window to the beggining.
   */
  scroll?: boolean;
}

export function useHandleTabs<Tab>(
  options: TabOptions<Tab>,
  config: Config = {}
) {
  const { queryKey, defaultSelected = true, scroll = false } = config;
  const [selected, setSelected] = useState<ExtractValue<Tab> | null>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams()!;
  const { replace } = useRouter();

  const currentTab = getCurrentTab<Tab>(
    options,
    queryKey ? (searchParams.get(queryKey) as ExtractValue<Tab>) : selected,
    defaultSelected
  );

  const changeTab = useCallback(
    (value: ExtractValue<Tab>) => {
      if (queryKey) {
        const params = new URLSearchParams(searchParams);
        params.set(queryKey, value as string);
        replace(`${pathname}?${params.toString()}`, { scroll });
      } else {
        setSelected(value);
      }
    },
    [queryKey, pathname, replace, searchParams, scroll]
  );

  useEffect(() => {
    if (currentTab) changeTab(currentTab);
    else replace(pathname!);
  }, [currentTab, changeTab, pathname, replace]);

  return { currentTab, changeTab };
}

function isTabOption<T>(opts: TabOption<T> | T): opts is TabOption<T> {
  return (opts as TabOption<T>)?.label !== undefined;
}
function isTabOptionArray<T>(
  opts: readonly TabOption<T>[] | readonly T[]
): opts is readonly TabOption<T>[] {
  return (opts as TabOption<T>[])[0]?.label !== undefined;
}
