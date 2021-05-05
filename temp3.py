import inspect

def log(a):
    call_line = inspect.stack()[1][4][0].strip()
    print(inspect.stack()[1][4])
    assert call_line.strip().startswith("log(")
    call_line = call_line[len("log("):][:-1]
    print(call_line)
    print ("Log: %s = %s" % (call_line, a))

def merge_sort(collection: list) -> list:

    def merge(left: list, right: list) -> list:

        def _merge():
            while left and right:
                yield (left if left[0] <= right[0] else right).pop(0)
            yield from left
            yield from right

        return list(_merge())

    if len(collection) <= 1:
        return collection
    mid = len(collection) // 2
    a = 1
    v = 3
    b = 4
    # k = inspect.stack()
    # print(k)
    # print(inspect.currentframe().f_back)
    # print(locals())
    return merge(merge_sort(collection[:mid]), merge_sort(collection[mid:]))

print(merge_sort([2,3]))
